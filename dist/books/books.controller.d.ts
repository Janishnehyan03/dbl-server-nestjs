import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<import("./book.schema").Book>;
    findAll(): Promise<import("./book.schema").Book[]>;
    findOne(id: string): Promise<import("./book.schema").Book>;
    getNewArrivals(): Promise<import("./book.schema").Book[]>;
    searchBooks(searchText: string): Promise<import("./book.schema").Book[]>;
    getBooksByCategory(categoryId: string): Promise<import("./book.schema").Book[]>;
    update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<import("./book.schema").Book>;
    remove(id: string): Promise<void>;
}
