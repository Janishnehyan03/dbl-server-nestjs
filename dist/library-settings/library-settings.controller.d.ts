import { LibrarySettingsService } from './library-settings.service';
import { CreateLibrarySettingsDto, UpdateLibrarySettingsDto } from './dto/create-library-settings.dto';
export declare class LibrarySettingsController {
    private readonly librarySettingsService;
    constructor(librarySettingsService: LibrarySettingsService);
    create(createLibrarySettingsDto: CreateLibrarySettingsDto): Promise<import("./schemas/library-settings.schema").LibrarySettings>;
    findAll(): Promise<import("./schemas/library-settings.schema").LibrarySettings[]>;
    findOne(id: string): Promise<import("./schemas/library-settings.schema").LibrarySettings>;
    update(id: string, updateLibrarySettingsDto: UpdateLibrarySettingsDto): Promise<import("./schemas/library-settings.schema").LibrarySettings>;
    remove(id: string): Promise<void>;
}
