import { Document } from 'mongoose';
export type DivisionDocument = Division & Document;
export declare class Division {
    name: string;
}
export declare const DivisionSchema: import("mongoose").Schema<Division, import("mongoose").Model<Division, any, any, any, Document<unknown, any, Division> & Division & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Division, Document<unknown, {}, import("mongoose").FlatRecord<Division>> & import("mongoose").FlatRecord<Division> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
