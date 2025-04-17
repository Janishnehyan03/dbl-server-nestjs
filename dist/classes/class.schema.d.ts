import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export type ClassDocument = Class & Document;
export declare class Class {
    name: string;
    section: MongooseSchema.Types.ObjectId;
    division: MongooseSchema.Types.ObjectId;
}
export declare const ClassSchema: MongooseSchema<Class, import("mongoose").Model<Class, any, any, any, Document<unknown, any, Class> & Class & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, Document<unknown, {}, import("mongoose").FlatRecord<Class>> & import("mongoose").FlatRecord<Class> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
