import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(name: string, section: string): Promise<Department> {
    return this.departmentModel.create({ name, section });
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().populate('section').exec();
  }

  async findById(id: string): Promise<Department> {
    const department = await this.departmentModel
      .findById(id)
      .populate('section')
      .exec();
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: string, name: string, section: string): Promise<Department> {
    const updatedDepartment = await this.departmentModel
      .findByIdAndUpdate(id, { name, section }, { new: true })
      .exec();
    if (!updatedDepartment) throw new NotFoundException('Department not found');
    return updatedDepartment;
  }

  async delete(id: string): Promise<Department> {
    const deletedDepartment = await this.departmentModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedDepartment) throw new NotFoundException('Department not found');
    return deletedDepartment;
  }
}
