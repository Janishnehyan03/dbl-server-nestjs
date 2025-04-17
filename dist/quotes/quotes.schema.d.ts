import { Document } from 'mongoose';
export type QuoteDocument = Quote & Document;
export declare class Quote {
    text: string;
    author: string;
}
export declare const QuoteSchema: import("mongoose").Schema<Quote, import("mongoose").Model<Quote, any, any, any, Document<unknown, any, Quote> & Quote & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quote, Document<unknown, {}, import("mongoose").FlatRecord<Quote>> & import("mongoose").FlatRecord<Quote> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
