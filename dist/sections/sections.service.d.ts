import { Model } from 'mongoose';
import { Section } from './section.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsService {
    private sectionModel;
    constructor(sectionModel: Model<Section>);
    create(createSectionDto: CreateSectionDto): Promise<Section>;
    findAll(): Promise<Section[]>;
    findOne(id: string): Promise<Section>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<Section>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
