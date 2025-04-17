import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true })
  name: string; // Example: create_user, delete_post, view_reports

  @Prop({ required: true })
  description: string; // Example: Allows user creation, Allows post deletion
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
