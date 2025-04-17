import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type PatronDocument = Patron & Document;

@Schema({ timestamps: true })
export class Patron {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, unique: true })
  admissionNumber?: string; // Required only if role is student

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Section', required: true })
  section: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Division', default: null })
  division: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Department',
    default: null,
  })
  department?: string; // Required only if class is not set

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Class', default: null })
  class?: string; // Required only if department is not set

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', required: true })
  role: string;

  @Prop({ default: 0 })
  currentBooksIssued: number; // Count of currently issued books

  @Prop({ default: 0 })
  totalBooksIssued: number; // Lifetime count

  @Prop({ default: 0 })
  finesDue: number; // Outstanding fines
}

export const PatronSchema = SchemaFactory.createForClass(Patron);
