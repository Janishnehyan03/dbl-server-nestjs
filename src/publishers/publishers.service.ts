import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { CreatePublisherDto, UpdatePublisherDto } from './dto/publisher.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
  ) {}

  async create(data: CreatePublisherDto): Promise<Publisher> {
    return this.publisherModel.create(data);
  }

  async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find();
  }

  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.publisherModel.findById(id);
    if (!publisher) throw new NotFoundException('Publisher not found');
    return publisher;
  }

  async update(id: string, data: UpdatePublisherDto): Promise<Publisher> {
    const updatedPublisher = await this.publisherModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
    if (!updatedPublisher) throw new NotFoundException('Publisher not found');
    return updatedPublisher;
  }

  async delete(id: string): Promise<Publisher> {
    const deletedPublisher = await this.publisherModel.findByIdAndDelete(id);
    if (!deletedPublisher) throw new NotFoundException('Publisher not found');
    return deletedPublisher;
  }
}
