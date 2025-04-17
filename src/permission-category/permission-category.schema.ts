import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type PermissionCategoryDocument = PermissionCategory & Document;

@Schema()
export class PermissionCategory {
  @Prop({ required: true, unique: true })
  name: string; // Example: User Management, Content Management, Reports

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Permission' })
  permissions?: MongooseSchema.Types.ObjectId[];
}

export const PermissionCategorySchema =
  SchemaFactory.createForClass(PermissionCategory);
