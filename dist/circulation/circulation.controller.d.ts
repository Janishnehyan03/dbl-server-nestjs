import { CirculationService } from './circulation.service';
import { IssueBookDto } from './dto/issue-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
export declare class CirculationController {
    private readonly circulationService;
    constructor(circulationService: CirculationService);
    issueBook(issueBookDto: IssueBookDto, user: any): Promise<{
        message: string;
        circulationId: import("mongoose").Types.ObjectId;
        dueDate: Date;
    }>;
    returnBook(returnBookDto: ReturnBookDto, user: any): Promise<{
        message: string;
        fine: number;
        transactionId: import("mongoose").Types.ObjectId;
    }>;
    renewBook(renewBookDto: RenewBookDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/circulation.schema").Circulation> & import("./schemas/circulation.schema").Circulation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOverdueBooks(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/circulation.schema").Circulation> & import("./schemas/circulation.schema").Circulation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPatronBooks(patronId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/circulation.schema").Circulation> & import("./schemas/circulation.schema").Circulation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    calculatePatronFines(patronId: string): Promise<{
        fines: number;
    }>;
}
