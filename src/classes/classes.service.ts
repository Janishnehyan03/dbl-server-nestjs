import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from './class.schema';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(
    name: string,
    section: string,
    division: string,
  ): Promise<Class> {
    return this.classModel.create({ name, section, division });
  }

  async findAll(): Promise<Class[]> {
    let classes = await this.classModel
      .find()
      .populate('section division')
      .exec();
    return classes;
  }

  async findById(id: string): Promise<Class> {
    const classData = await this.classModel
      .findById(id)
      .populate('section division')
      .exec();
    if (!classData) throw new NotFoundException('Class not found');
    return classData;
  }

  async update(
    id: string,
    name: string,
    section: string,
    division: string,
  ): Promise<Class> {
    let updatedClass = await this.classModel
      .findByIdAndUpdate(id, { name, section, division }, { new: true })
      .exec();

    if (!updatedClass) throw new NotFoundException('Class not found');
    return updatedClass;
  }

  async delete(id: string): Promise<Class> {
    const deletedClass = await this.classModel.findByIdAndDelete(id).exec();
    if (!deletedClass) throw new NotFoundException('Class not found');
    return deletedClass;
  }
}
