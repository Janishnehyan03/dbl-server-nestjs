import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema({ timestamps: true })
export class Quote {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  author: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
