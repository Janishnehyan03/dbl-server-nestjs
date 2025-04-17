import mongoose, { Document } from 'mongoose';
export type BookDocument = Book & Document;
export declare class Book {
    title: string;
    accNumber: string;
    callNumber: string;
    authors: string[];
    categories: string[];
    pages: number;
    edition: string;
    issn: string;
    location: string;
    publisher: string;
    language: string;
    price: number;
    isNewArrival: boolean;
    status: string;
    publishedDate: string;
    isbn: string;
    published: boolean;
    keywords: string[];
    currentHolder: string;
    lastIssueDate: Date;
    totalIssues: number;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book> & Book & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>> & mongoose.FlatRecord<Book> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
