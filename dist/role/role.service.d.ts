import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
export declare class RoleService {
    private roleModel;
    constructor(roleModel: Model<RoleDocument>);
    create(name: string, permissions: string[]): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: string): Promise<Role>;
    update(id: string, name: string, permissions: string[]): Promise<Role>;
    delete(id: string): Promise<Role>;
}
