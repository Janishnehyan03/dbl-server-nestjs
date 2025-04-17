import { DepartmentService } from './departments.service';
import { Department } from './department.schema';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(name: string, section: string): Promise<Department>;
    findAll(): Promise<Department[]>;
    findById(id: string): Promise<Department>;
    update(id: string, name: string, section: string): Promise<Department>;
    delete(id: string): Promise<Department>;
}
