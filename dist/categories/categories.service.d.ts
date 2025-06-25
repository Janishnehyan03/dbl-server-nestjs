import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BookDocument } from 'src/books/book.schema';
export declare class CategoriesService {
    private categoryModel;
    private bookModel;
    constructor(categoryModel: Model<Category>, bookModel: Model<BookDocument>);
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    findBooksInCategory(id: string): Promise<any>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
