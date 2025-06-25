import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./category.schema").Category>;
    findAll(): Promise<import("./category.schema").Category[]>;
    findOne(id: string): Promise<import("./category.schema").Category>;
    findBooksInCategory(id: string): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./category.schema").Category>;
    remove(id: string): Promise<void>;
}
