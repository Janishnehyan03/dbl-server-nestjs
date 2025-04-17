import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export declare class Section extends Document {
    name: string;
    description?: string;
    departments?: MongooseSchema.Types.ObjectId[];
    classes?: MongooseSchema.Types.ObjectId[];
    hasDepartments: boolean;
}
export declare const SectionSchema: MongooseSchema<Section, import("mongoose").Model<Section, any, any, any, Document<unknown, any, Section> & Section & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Section, Document<unknown, {}, import("mongoose").FlatRecord<Section>> & import("mongoose").FlatRecord<Section> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
