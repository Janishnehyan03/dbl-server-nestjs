import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { CirculationDocument } from '../circulation/schemas/circulation.schema';
export declare class BooksService {
    private bookModel;
    private circulationModel;
    constructor(bookModel: Model<BookDocument>, circulationModel: Model<CirculationDocument>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    totalBooks(): Promise<number>;
    findOne(id: string): Promise<Book & {
        circulation?: any;
    }>;
    update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book>;
    getNewArrivals(): Promise<Book[]>;
    getBooksByCategory(categoryId: string): Promise<Book[]>;
    searchBooks(search: string): Promise<Book[]>;
    remove(id: string): Promise<void>;
}
