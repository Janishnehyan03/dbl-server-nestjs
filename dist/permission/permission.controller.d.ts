import { PermissionService } from './permission.service';
import { Permission } from './permission.schema';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(name: string, description: string): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission>;
    update(id: string, name: string, description: string): Promise<Permission>;
    delete(id: string): Promise<Permission>;
}
