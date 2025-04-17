import { PublishersService } from './publishers.service';
import { CreatePublisherDto, UpdatePublisherDto } from './dto/publisher.dto';
export declare class PublishersController {
    private readonly publishersService;
    constructor(publishersService: PublishersService);
    create(createPublisherDto: CreatePublisherDto): Promise<import("./publisher.schema").Publisher>;
    findAll(): Promise<import("./publisher.schema").Publisher[]>;
    findOne(id: string): Promise<import("./publisher.schema").Publisher>;
    update(id: string, updatePublisherDto: UpdatePublisherDto): Promise<import("./publisher.schema").Publisher>;
    delete(id: string): Promise<import("./publisher.schema").Publisher>;
}
