import { PatronService } from './patron.service';
import { Patron } from './patron.schema';
export declare class PatronController {
    private readonly patronService;
    constructor(patronService: PatronService);
    createBulk(patrons: {
        type: string;
        data: Partial<Patron>[];
        metadata: any;
    }): Promise<Patron[]>;
    findAll(query: any): Promise<Patron[]>;
    findById(id: string): Promise<Patron>;
    searchPatrons(admissionNumber: string): Promise<Patron>;
    update(id: string, updateData: Partial<Patron>): Promise<Patron>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
