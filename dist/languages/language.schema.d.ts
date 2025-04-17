import { Document } from 'mongoose';
export declare class Language extends Document {
    name: string;
    code: string;
}
export declare const LanguageSchema: import("mongoose").Schema<Language, import("mongoose").Model<Language, any, any, any, Document<unknown, any, Language> & Language & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Language, Document<unknown, {}, import("mongoose").FlatRecord<Language>> & import("mongoose").FlatRecord<Language> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
