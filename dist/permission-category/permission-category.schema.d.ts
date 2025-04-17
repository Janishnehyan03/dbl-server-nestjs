import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export type PermissionCategoryDocument = PermissionCategory & Document;
export declare class PermissionCategory {
    name: string;
    permissions?: MongooseSchema.Types.ObjectId[];
}
export declare const PermissionCategorySchema: MongooseSchema<PermissionCategory, import("mongoose").Model<PermissionCategory, any, any, any, Document<unknown, any, PermissionCategory> & PermissionCategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PermissionCategory, Document<unknown, {}, import("mongoose").FlatRecord<PermissionCategory>> & import("mongoose").FlatRecord<PermissionCategory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
