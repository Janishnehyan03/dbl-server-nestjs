import { Model } from 'mongoose';
import { PermissionCategory, PermissionCategoryDocument } from './permission-category.schema';
export declare class PermissionCategoryService {
    private permissionCategoryModel;
    constructor(permissionCategoryModel: Model<PermissionCategoryDocument>);
    create(name: string, permissions: string[]): Promise<PermissionCategory>;
    findAll(): Promise<PermissionCategory[]>;
    findById(id: string): Promise<PermissionCategory>;
    update(id: string, name: string, permissions: string[]): Promise<PermissionCategory>;
    delete(id: string): Promise<PermissionCategory>;
}
