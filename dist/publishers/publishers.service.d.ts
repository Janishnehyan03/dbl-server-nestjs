import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { CreatePublisherDto, UpdatePublisherDto } from './dto/publisher.dto';
export declare class PublishersService {
    private publisherModel;
    constructor(publisherModel: Model<PublisherDocument>);
    create(data: CreatePublisherDto): Promise<Publisher>;
    findAll(): Promise<Publisher[]>;
    findOne(id: string): Promise<Publisher>;
    update(id: string, data: UpdatePublisherDto): Promise<Publisher>;
    delete(id: string): Promise<Publisher>;
}
