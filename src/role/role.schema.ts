import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string; // Example: Admin, User, Controller

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Department' }] })
  permissions?: MongooseSchema.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
