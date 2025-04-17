import { RoleService } from './role.service';
import { Role } from './role.schema';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(name: string, permissions: string[]): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: string): Promise<Role>;
    update(id: string, name: string, permissions: string[]): Promise<Role>;
    delete(id: string): Promise<Role>;
}
