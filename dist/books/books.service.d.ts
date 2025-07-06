import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    totalBooks(): Promise<number>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book>;
    getNewArrivals(): Promise<Book[]>;
    getBooksByCategory(categoryId: string): Promise<Book[]>;
    searchBooks(search: string): Promise<Book[]>;
    remove(id: string): Promise<void>;
}
