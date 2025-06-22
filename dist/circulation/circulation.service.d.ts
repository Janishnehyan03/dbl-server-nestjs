import { Model, Types } from 'mongoose';
import { Circulation } from './schemas/circulation.schema';
import { Book } from 'src/books/book.schema';
import { Patron } from 'src/patron/patron.schema';
import { IssueBookDto } from './dto/issue-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
export declare class CirculationService {
    private circulationModel;
    private bookModel;
    private patronModel;
    constructor(circulationModel: Model<Circulation>, bookModel: Model<Book>, patronModel: Model<Patron>);
    issueBook(issueBookDto: IssueBookDto, staffId: string): Promise<{
        message: string;
        circulationId: Types.ObjectId;
        dueDate: Date;
    }>;
    returnBook(returnBookDto: ReturnBookDto, staffId: string): Promise<{
        message: string;
        fine: number;
        transactionId: Types.ObjectId;
    }>;
    renewBook(renewBookDto: RenewBookDto, staffId: string): Promise<import("mongoose").Document<unknown, {}, Circulation> & Circulation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOverdueBooks(): Promise<(import("mongoose").Document<unknown, {}, Circulation> & Circulation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPatronBooks(patronId: string): Promise<(import("mongoose").Document<unknown, {}, Circulation> & Circulation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    calculatePatronFines(patronId: string): Promise<number>;
}
