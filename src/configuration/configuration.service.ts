import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration, ConfigurationDocument } from './configuration.schema';
import { CreateConfigurationDto, UpdateConfigurationDto } from './dto/configuration.dto';

@Injectable()
export class ConfigurationService {
  constructor(@InjectModel(Configuration.name) private configModel: Model<ConfigurationDocument>) {}

  async create(data: CreateConfigurationDto): Promise<Configuration> {
    return new this.configModel(data).save();
  }

  async findAll(): Promise<Configuration[]> {
    return this.configModel.find().exec();
  }

  async findOne(id: string): Promise<Configuration> {
    const config = await this.configModel.findById(id).exec();
    if (!config) throw new NotFoundException(`Configuration not found`);
    return config;
  }

  async update(id: string, updateData: UpdateConfigurationDto): Promise<Configuration> {
    const updatedConfig = await this.configModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedConfig) throw new NotFoundException(`Configuration not found`);
    return updatedConfig;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.configModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Configuration not found`);
    return { message: 'Configuration deleted successfully' };
  }
}
