import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export type RoleDocument = Role & Document;
export declare class Role {
    name: string;
    permissions?: MongooseSchema.Types.ObjectId[];
}
export declare const RoleSchema: MongooseSchema<Role, import("mongoose").Model<Role, any, any, any, Document<unknown, any, Role> & Role & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Role, Document<unknown, {}, import("mongoose").FlatRecord<Role>> & import("mongoose").FlatRecord<Role> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
