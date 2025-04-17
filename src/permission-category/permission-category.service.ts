import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PermissionCategory,
  PermissionCategoryDocument,
} from './permission-category.schema';

@Injectable()
export class PermissionCategoryService {
  constructor(
    @InjectModel(PermissionCategory.name)
    private permissionCategoryModel: Model<PermissionCategoryDocument>,
  ) {}

  async create(
    name: string,
    permissions: string[],
  ): Promise<PermissionCategory> {
    return this.permissionCategoryModel.create({ name, permissions });
  }

  async findAll(): Promise<PermissionCategory[]> {
    return this.permissionCategoryModel.find().exec();
  }

  async findById(id: string): Promise<PermissionCategory> {
    const category = await this.permissionCategoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Permission category not found');
    return category;
  }

  async update(
    id: string,
    name: string,
    permissions: string[],
  ): Promise<PermissionCategory> {
    let updatedCategory = await this.permissionCategoryModel
      .findByIdAndUpdate(id, { name, permissions }, { new: true })
      .exec();
    if (!updatedCategory)
      throw new NotFoundException('Permission category not found');
    return updatedCategory;
  }

  async delete(id: string): Promise<PermissionCategory> {
    const deletedCategory = await this.permissionCategoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory)
      throw new NotFoundException('Permission category not found');
    return deletedCategory;
  }
}
