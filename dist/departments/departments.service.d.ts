import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './department.schema';
export declare class DepartmentService {
    private departmentModel;
    constructor(departmentModel: Model<DepartmentDocument>);
    create(name: string, section: string): Promise<Department>;
    findAll(): Promise<Department[]>;
    findById(id: string): Promise<Department>;
    update(id: string, name: string, section: string): Promise<Department>;
    delete(id: string): Promise<Department>;
}
