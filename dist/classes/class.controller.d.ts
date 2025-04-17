import { ClassesService } from './classes.service';
import { Class } from './class.schema';
export declare class ClassesController {
    private readonly classService;
    constructor(classService: ClassesService);
    create(name: string, section: string, division: string): Promise<Class>;
    findAll(): Promise<Class[]>;
    findById(id: string): Promise<Class>;
    update(id: string, name: string, section: string, division: string): Promise<Class>;
    delete(id: string): Promise<Class>;
}
