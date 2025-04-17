import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionCategory, PermissionCategorySchema } from './permission-category.schema';
import { PermissionCategoryService } from './permission-category.service';
import { PermissionCategoryController } from './permission-category.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: PermissionCategory.name, schema: PermissionCategorySchema }])],
  controllers: [PermissionCategoryController],
  providers: [PermissionCategoryService],
  exports: [PermissionCategoryService],
})
export class PermissionCategoryModule {}
