import { Document } from 'mongoose';
export type ConfigurationDocument = Configuration & Document;
export declare class Configuration {
    libraryTitle: string;
    description: string;
    email: string;
    contactNumber: string;
    openingDays: string[];
    openingTime: string;
    closingTime: string;
    maxBooksPerStudent: number;
    maxBooksPerTeacher: number;
    borrowDurationDays: number;
    finePerDay: number;
    isActive: boolean;
}
export declare const ConfigurationSchema: import("mongoose").Schema<Configuration, import("mongoose").Model<Configuration, any, any, any, Document<unknown, any, Configuration> & Configuration & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Configuration, Document<unknown, {}, import("mongoose").FlatRecord<Configuration>> & import("mongoose").FlatRecord<Configuration> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
