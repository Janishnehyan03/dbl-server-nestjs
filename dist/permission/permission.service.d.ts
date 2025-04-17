import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './permission.schema';
export declare class PermissionService {
    private permissionModel;
    constructor(permissionModel: Model<PermissionDocument>);
    create(name: string, description: string): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission>;
    update(id: string, name: string, description: string): Promise<Permission>;
    delete(id: string): Promise<Permission>;
}
