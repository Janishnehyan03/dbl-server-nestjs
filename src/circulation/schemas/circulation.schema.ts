import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CirculationDocument = Circulation & Document;

@Schema({ timestamps: true })
export class Circulation {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patron', required: true })
  patron: Types.ObjectId;

  @Prop({ required: true, default: Date.now })
  issueDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  returnDate: Date;

  @Prop({ enum: ['issued', 'returned', 'overdue', 'lost'], default: 'issued' })
  status: string;

  @Prop({ default: 0 })
  renewals: number;

  @Prop({ default: 0 })
  fine: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop()
  notes: string;
}

export const CirculationSchema = SchemaFactory.createForClass(Circulation);
