import { Document } from 'mongoose';
export type PublisherDocument = Publisher & Document;
export declare class Publisher {
    name: string;
    location?: string;
    address?: string;
    email?: string;
    phone?: string;
}
export declare const PublisherSchema: import("mongoose").Schema<Publisher, import("mongoose").Model<Publisher, any, any, any, Document<unknown, any, Publisher> & Publisher & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Publisher, Document<unknown, {}, import("mongoose").FlatRecord<Publisher>> & import("mongoose").FlatRecord<Publisher> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
