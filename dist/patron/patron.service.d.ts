import { Model } from 'mongoose';
import { Patron, PatronDocument } from './patron.schema';
export declare class PatronService {
    private readonly patronModel;
    constructor(patronModel: Model<PatronDocument>);
    createBulk(patrons: {
        type: string;
        data: Partial<Patron>[];
        metadata: any;
    }): Promise<Patron[]>;
    findAll(filter?: any): Promise<Patron[]>;
    findById(id: string): Promise<Patron>;
    update(id: string, updateData: Partial<Patron>): Promise<Patron>;
    searchPatrons(searchText: string): Promise<Patron[]>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
