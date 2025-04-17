import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

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

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel
      .findById(id)
      .populate('authors')
      .populate('categories')
      .populate('publisher')
      .exec();

    if (!book) throw new NotFoundException('Book not found');
    return book;
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

  async searchBooks(searchText: string): Promise<Book[]> {
    if (!searchText?.trim()) {
      throw new BadRequestException('Search text is required.');
    }

    const regex = new RegExp(searchText.trim(), 'i'); // Case-insensitive regex
    const books = await this.bookModel
      .find({
        $or: [
          { title: regex },
          { accNumber: regex },
          { callNumber: regex },
          { isbn: regex }, // Consider adding ISBN if relevant
          { 'authors.name': regex }, // Search by author names if needed
        ],
      })
      .populate(['publisher', 'categories', 'authors'])
      .exec();

    if (!books.length) {
      throw new NotFoundException(
        'No books found matching the search criteria.',
      );
    }

    return books;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Book not found');
  }
}
