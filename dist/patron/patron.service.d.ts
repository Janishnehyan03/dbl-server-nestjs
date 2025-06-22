import { Model } from 'mongoose';
import { CirculationDocument } from '../circulation/schemas/circulation.schema';
import { Patron, PatronDocument } from './patron.schema';
export declare class PatronService {
    private patronModel;
    private circulationModel;
    constructor(patronModel: Model<PatronDocument>, circulationModel: Model<CirculationDocument>);
    createBulk(patrons: {
        type: string;
        data: Partial<Patron>[];
        metadata: any;
    }): Promise<Patron[]>;
    findAll(filter?: any): Promise<Patron[]>;
    findById(id: string): Promise<Patron>;
    findByAdmissionNumber(admissionNumber: string): Promise<Patron>;
    update(id: string, updateData: Partial<Patron>): Promise<Patron>;
    searchPatron(admissionNumber: string): Promise<Patron>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
