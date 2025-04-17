import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async create(dto: CreateAuthorDto): Promise<Author> {
    return this.authorModel.create(dto);
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, dto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorModel.findByIdAndUpdate(id, dto, { new: true });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async remove(id: string): Promise<void> {
    const author = await this.authorModel.findByIdAndDelete(id);
    if (!author) throw new NotFoundException('Author not found');
  }
}
