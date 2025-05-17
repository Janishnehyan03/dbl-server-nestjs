import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LibrarySettings } from './schemas/library-settings.schema';
import {
  CreateLibrarySettingsDto,
  UpdateLibrarySettingsDto,
} from './dto/create-library-settings.dto';

@Injectable()
export class LibrarySettingsService {
  constructor(
    @InjectModel(LibrarySettings.name)
    private librarySettingsModel: Model<any>,
  ) {}

  async create(
    createLibrarySettingsDto: CreateLibrarySettingsDto,
  ): Promise<LibrarySettings> {
    console.log(
      'Creating library settings with data:',
      createLibrarySettingsDto,
    );
    const existingSettings = await this.librarySettingsModel.findOne({
      libraryName: createLibrarySettingsDto.libraryName,
    });
    if (existingSettings) {
      throw new BadRequestException('Library with this name already exists');
    }

    const createdSettings = new this.librarySettingsModel(
      createLibrarySettingsDto,
    );
    return createdSettings.save();
  }

  async findAll(): Promise<LibrarySettings[]> {
    return this.librarySettingsModel.find().exec();
  }

  async findOne(id: string): Promise<LibrarySettings> {
    const settings = await this.librarySettingsModel.findById(id).exec();
    if (!settings) {
      throw new NotFoundException(`Library settings with ID ${id} not found`);
    }
    return settings;
  }

  async update(
    id: string,
    updateLibrarySettingsDto: UpdateLibrarySettingsDto,
  ): Promise<LibrarySettings> {
    const existingSettings = await this.librarySettingsModel
      .findById(id)
      .exec();
    if (!existingSettings) {
      throw new NotFoundException(`Library settings with ID ${id} not found`);
    }

    if (
      updateLibrarySettingsDto.libraryName &&
      updateLibrarySettingsDto.libraryName !== existingSettings.libraryName
    ) {
      const nameExists = await this.librarySettingsModel.findOne({
        libraryName: updateLibrarySettingsDto.libraryName,
      });
      if (nameExists) {
        throw new BadRequestException('Library with this name already exists');
      }
    }

    return this.librarySettingsModel
      .findByIdAndUpdate(id, updateLibrarySettingsDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.librarySettingsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Library settings with ID ${id} not found`);
    }
  }
}
