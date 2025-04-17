import { CirculationService } from './circulation.service';
import { IssueBookDto } from './dto/issue-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
export declare class CirculationController {
    private readonly circulationService;
    constructor(circulationService: CirculationService);
    issueBook(issueBookDto: IssueBookDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    returnBook(returnBookDto: ReturnBookDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    renewBook(renewBookDto: RenewBookDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOverdueBooks(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPatronBooks(patronId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    calculatePatronFines(patronId: string): Promise<{
        fines: number;
    }>;
}
