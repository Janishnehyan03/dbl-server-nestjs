import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Division, DivisionDocument } from './division.schema';

@Injectable()
export class DivisionService {
  constructor(
    @InjectModel(Division.name) private divisionModel: Model<DivisionDocument>,
  ) {}

  async create(name: string): Promise<Division> {
    return this.divisionModel.create({ name });
  }

  async findAll(): Promise<Division[]> {
    return this.divisionModel.find().exec();
  }

  async findById(id: string): Promise<Division> {
    const division = await this.divisionModel.findById(id).exec();
    if (!division) throw new NotFoundException('Division not found');
    return division;
  }

  async update(id: string, name: string): Promise<Division> {
    const updatedDivision = await this.divisionModel
      .findByIdAndUpdate(id, { name }, { new: true })
      .exec();
    if (!updatedDivision) throw new NotFoundException('Division not found');
    return updatedDivision;
  }

  async delete(id: string): Promise<Division> {
    const deletedDivision = await this.divisionModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedDivision) throw new NotFoundException('Division not found');
    return deletedDivision;
  }
}
