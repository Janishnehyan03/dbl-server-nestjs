import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section } from './section.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>, // ✅ Ensure correct model injection
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionModel.create(createSectionDto);
  }

  async findAll(): Promise<Section[]> {
    return this.sectionModel.find().exec();
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) throw new NotFoundException('Section not found');
    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto): Promise<Section> {
    const updatedSection = await this.sectionModel.findByIdAndUpdate(id, updateSectionDto, { new: true }).exec();
    if (!updatedSection) throw new NotFoundException('Section not found');
    return updatedSection;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedSection = await this.sectionModel.findByIdAndDelete(id).exec();
    if (!deletedSection) throw new NotFoundException('Section not found');
    return { message: 'Section deleted successfully' };
  }
}
