import { Document, Types } from 'mongoose';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    book: Types.ObjectId;
    patron: Types.ObjectId;
    issueDate: Date;
    dueDate: Date;
    returnDate: Date;
    status: string;
    renewals: number;
    fine: number;
    createdBy: Types.ObjectId;
    notes: string;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
