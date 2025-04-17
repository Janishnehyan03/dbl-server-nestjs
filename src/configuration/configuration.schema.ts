import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigurationDocument = Configuration & Document;

@Schema({ timestamps: true })
export class Configuration {
  @Prop({ required: true })
  libraryTitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ type: [String], required: true })
  openingDays: string[]; // Example: ["Monday", "Tuesday", "Wednesday"]

  @Prop({ required: true })
  openingTime: string; // Example: "09:00 AM"

  @Prop({ required: true })
  closingTime: string; // Example: "06:00 PM"

  @Prop({ required: true, default: 5 })
  maxBooksPerStudent: number; // Maximum books allowed to borrow

  @Prop({ required: true , default: 10 })
  maxBooksPerTeacher: number; // Maximum books allowed to borrow

  @Prop({ required: true, default: 14 })
  borrowDurationDays: number; // Days before return is required

  @Prop({ required: true, default: 2 })
  finePerDay: number; // Fine per day for late return

  @Prop({ default: true })
  isActive: boolean;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
