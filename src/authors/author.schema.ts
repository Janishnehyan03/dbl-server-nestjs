import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Author extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ trim: true })
  bio?: string;

  @Prop({ trim: true })
  nationality?: string;

  @Prop({ trim: true })
  email: string;

  @Prop({ trim: true })
  website?: string;

  @Prop({ trim: true })
  linkedin?: string;

  @Prop({ trim: true })
  twitter?: string;

  @Prop({ trim: true })
  facebook?: string;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
