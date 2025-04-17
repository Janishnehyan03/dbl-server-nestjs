import { Document } from 'mongoose';
export declare class Author extends Document {
    name: string;
    bio?: string;
    nationality?: string;
    email: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    updatedAt: Date;
    createdAt: Date;
}
export declare const AuthorSchema: import("mongoose").Schema<Author, import("mongoose").Model<Author, any, any, any, Document<unknown, any, Author> & Author & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Author, Document<unknown, {}, import("mongoose").FlatRecord<Author>> & import("mongoose").FlatRecord<Author> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
