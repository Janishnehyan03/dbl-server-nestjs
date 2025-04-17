import { Model } from 'mongoose';
import { Division, DivisionDocument } from './division.schema';
export declare class DivisionService {
    private divisionModel;
    constructor(divisionModel: Model<DivisionDocument>);
    create(name: string): Promise<Division>;
    findAll(): Promise<Division[]>;
    findById(id: string): Promise<Division>;
    update(id: string, name: string): Promise<Division>;
    delete(id: string): Promise<Division>;
}
