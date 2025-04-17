import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './language.schema';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private languageModel: Model<Language>) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    return this.languageModel.create(createLanguageDto);
  }

  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  async findOne(id: string): Promise<Language> {
    const language = await this.languageModel.findById(id).exec();
    if (!language) throw new NotFoundException('Language not found');
    return language;
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    const updatedLanguage = await this.languageModel.findByIdAndUpdate(id, updateLanguageDto, { new: true }).exec();
    if (!updatedLanguage) throw new NotFoundException('Language not found');
    return updatedLanguage;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedLanguage = await this.languageModel.findByIdAndDelete(id).exec();
    if (!deletedLanguage) throw new NotFoundException('Language not found');
    return { message: 'Language deleted successfully' };
  }
}
