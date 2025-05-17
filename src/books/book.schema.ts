import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  accNumber: string;

  @Prop({ required: true, unique: true })
  callNumber: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    default: [],
    ref: 'Author',
  })
  authors: string[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    default: [],
    ref: 'Category',
  })
  categories: string[];

  @Prop()
  pages: number;

  @Prop()
  edition: string;

  @Prop()
  issn: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Location',
  })
  location: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Publisher',
  })
  publisher: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Language',
  })
  language: string;

  @Prop()
  price: number;

  @Prop({ default: false })
  isNewArrival: boolean;

  @Prop({
    default: 'available',
    enum: ['available', 'issued', 'lost', 'damaged'],
  })
  status: string;

  @Prop()
  publishedDate: string;

  @Prop()
  isbn: string;

  @Prop({ default: false })
  published: boolean;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Patron',
    default: null,
  })
  currentHolder: string;

  @Prop()
  lastIssueDate: Date;

  @Prop({ default: 0 })
  totalIssues: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
