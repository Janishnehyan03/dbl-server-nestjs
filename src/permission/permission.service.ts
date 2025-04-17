import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './permission.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(name: string, description: string): Promise<Permission> {
    return this.permissionModel.create({ name, description });
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(
    id: string,
    name: string,
    description: string,
  ): Promise<Permission> {
    let updatedPermission = await this.permissionModel
      .findByIdAndUpdate(id, { name, description }, { new: true })
      .exec();
    if (!updatedPermission) throw new NotFoundException('Permission not found');
    return updatedPermission;
  }

  async delete(id: string): Promise<Permission> {
    const deletedPermission = await this.permissionModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedPermission) throw new NotFoundException('Permission not found');
    return deletedPermission;
  }
}
