import { PermissionCategoryService } from './permission-category.service';
import { PermissionCategory } from './permission-category.schema';
export declare class PermissionCategoryController {
    private readonly permissionCategoryService;
    constructor(permissionCategoryService: PermissionCategoryService);
    create(name: string, permissions: string[]): Promise<PermissionCategory>;
    findAll(): Promise<PermissionCategory[]>;
    findById(id: string): Promise<PermissionCategory>;
    update(id: string, name: string, permissions: string[]): Promise<PermissionCategory>;
    delete(id: string): Promise<PermissionCategory>;
}
