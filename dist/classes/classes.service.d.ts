import { Model } from 'mongoose';
import { Class, ClassDocument } from './class.schema';
export declare class ClassesService {
    private classModel;
    constructor(classModel: Model<ClassDocument>);
    create(name: string, section: string, division: string): Promise<Class>;
    findAll(): Promise<Class[]>;
    findById(id: string): Promise<Class>;
    update(id: string, name: string, section: string, division: string): Promise<Class>;
    delete(id: string): Promise<Class>;
}
