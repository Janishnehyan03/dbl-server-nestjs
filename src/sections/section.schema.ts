import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Section extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Department' }] })
  departments?: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Class' }] })
  classes?: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  hasDepartments: boolean;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
