import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DivisionDocument = Division & Document;

@Schema()
export class Division {
  @Prop({ required: true })
  name: string;
}

export const DivisionSchema = SchemaFactory.createForClass(Division);
