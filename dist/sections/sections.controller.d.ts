import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsController {
    private readonly sectionService;
    constructor(sectionService: SectionsService);
    create(createSectionDto: CreateSectionDto): Promise<import("./section.schema").Section>;
    findAll(): Promise<import("./section.schema").Section[]>;
    findOne(id: string): Promise<import("./section.schema").Section>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<import("./section.schema").Section>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
