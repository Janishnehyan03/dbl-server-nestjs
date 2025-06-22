import { Document, Types } from 'mongoose';
export type CirculationDocument = Circulation & Document;
export declare class Circulation {
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
export declare const CirculationSchema: import("mongoose").Schema<Circulation, import("mongoose").Model<Circulation, any, any, any, Document<unknown, any, Circulation> & Circulation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Circulation, Document<unknown, {}, import("mongoose").FlatRecord<Circulation>> & import("mongoose").FlatRecord<Circulation> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
