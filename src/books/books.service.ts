import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import {
  CirculationDocument,
  Circulation,
} from '../circulation/schemas/circulation.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Circulation.name)
    private circulationModel: Model<CirculationDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel
      .find()
      .populate('publisher')
      .populate('categories')
      .populate('authors')
      .exec();
  }
  async totalBooks(): Promise<number> {
    return this.bookModel.countDocuments().exec();
  }
  async findOne(id: string): Promise<Book & { circulation?: any }> {
    const book = await this.bookModel
      .findById(id)
      .populate('authors')
      .populate('categories')
      .populate('publisher')
      .populate('location')
      .populate('language')
      .exec();

    if (!book) throw new NotFoundException('Book not found');

    // Populate circulation details if the book is issued
    // Assumes a 'circulation' field referencing a Circulation model
    // and Circulation has a 'patron' field referencing a Patron model
    const circulation = await this.circulationModel
      .findOne({ book: new mongoose.Types.ObjectId(id), status: 'issued' })
      .populate({
        path: 'patron',
        select: 'name admissionNumber section',
        populate: {
          path: 'section',
          select: 'name ', // add other fields as needed
        },
      })
      .exec();

    return { ...book.toObject(), circulation };
  }

  async update(
    id: string,
    updateBookDto: Partial<CreateBookDto>,
  ): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async getNewArrivals(): Promise<Book[]> {
    const books = await this.bookModel
      .find({ isNewArrival: true, published: true })
      .populate('publisher')
      .populate('categories')
      .populate('authors')
      .exec();

    if (books.length > 0) {
      return books;
    }

    return this.bookModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('publisher')
      .populate('categories')
      .populate('authors')
      .exec();
  }

  async getBooksByCategory(categoryId: string): Promise<Book[]> {
    return this.bookModel
      .find({ categories: categoryId })
      .populate('publisher')
      .populate('categories')
      .populate('authors')
      .exec();
  }

  async searchBooks(search: string): Promise<Book[]> {
    // Example request:
    // GET /books/search/data?search=author:asimov

    if (!search?.trim()) {
      throw new BadRequestException('Search parameter is required.');
    }

    // Parse the search string, e.g., "author:asimov"
    const [field, ...valueParts] = search.split(':');
    const value = valueParts.join(':').trim();

    if (!field || !value) {
      throw new BadRequestException(
        'Search parameter must be in the format "field:value".',
      );
    }

    // Allowed fields
    const allowedFields = [
      'author',
      'title',
      'isbn',
      'accNumber',
      'callNumber',
    ];
    if (!allowedFields.includes(field)) {
      throw new BadRequestException(
        `Search by field "${field}" is not allowed. Allowed fields: ${allowedFields.join(', ')}.`,
      );
    }

    if (field === 'author') {
      // Search books whose authors' names match the value (case-insensitive)
      const books = await this.bookModel
        .find()
        .populate({
          path: 'authors',
          match: { name: { $regex: value, $options: 'i' } },
        })
        .populate(['publisher', 'categories'])
        .exec();

      // Filter out books where no authors matched
      return books.filter(
        (book) => Array.isArray(book.authors) && book.authors.length > 0,
      );
    } else {
      // For other fields, search directly on the Book model
      const query: any = {};
      // Use regex for partial/case-insensitive match except for isbn, accNumber, callNumber
      if (['title'].includes(field)) {
        query[field] = { $regex: value, $options: 'i' };
      } else {
        query[field] = value;
      }

      return this.bookModel
        .find(query)
        .populate(['publisher', 'categories', 'authors'])
        .exec();
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Book not found');
  }
}
