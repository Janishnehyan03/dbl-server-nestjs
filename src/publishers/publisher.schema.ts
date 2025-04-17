import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema({ timestamps: true })
export class Publisher {
  @Prop({ required: true , unique: true})
  name: string;

  @Prop()
  location?: string;

  @Prop()
  address?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
