import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(name: string, permissions: string[]): Promise<Role> {
    return this.roleModel.create({ name, permissions });
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, name: string, permissions: string[]): Promise<Role> {
    let role = await this.roleModel
      .findByIdAndUpdate(id, { name, permissions }, { new: true })
      .exec();
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async delete(id: string): Promise<Role> {
    let role = await this.roleModel.findByIdAndDelete(id).exec();
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
