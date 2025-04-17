import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export type DepartmentDocument = Department & Document;
export declare class Department {
    name: string;
    section: MongooseSchema.Types.ObjectId;
}
export declare const DepartmentSchema: MongooseSchema<Department, import("mongoose").Model<Department, any, any, any, Document<unknown, any, Department> & Department & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department, Document<unknown, {}, import("mongoose").FlatRecord<Department>> & import("mongoose").FlatRecord<Department> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
