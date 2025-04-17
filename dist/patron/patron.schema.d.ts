import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type PatronDocument = Patron & Document;
export declare class Patron {
    name: string;
    admissionNumber?: string;
    section: string;
    division: string;
    department?: string;
    class?: string;
    role: string;
    currentBooksIssued: number;
    totalBooksIssued: number;
    finesDue: number;
}
export declare const PatronSchema: MongooseSchema<Patron, import("mongoose").Model<Patron, any, any, any, Document<unknown, any, Patron> & Patron & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Patron, Document<unknown, {}, import("mongoose").FlatRecord<Patron>> & import("mongoose").FlatRecord<Patron> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
