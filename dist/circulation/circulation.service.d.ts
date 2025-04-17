import { Model, Types } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { Book } from 'src/books/book.schema';
import { Patron } from 'src/patron/patron.schema';
import { IssueBookDto } from './dto/issue-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
export declare class CirculationService {
    private transactionModel;
    private bookModel;
    private patronModel;
    constructor(transactionModel: Model<Transaction>, bookModel: Model<Book>, patronModel: Model<Patron>);
    issueBook(issueBookDto: IssueBookDto, staffId: string): Promise<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    returnBook(returnBookDto: ReturnBookDto, staffId: string): Promise<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    renewBook(renewBookDto: RenewBookDto, staffId: string): Promise<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOverdueBooks(): Promise<(import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPatronBooks(patronId: string): Promise<(import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    calculatePatronFines(patronId: string): Promise<number>;
}
