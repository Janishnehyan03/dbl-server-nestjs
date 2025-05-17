import { Model } from 'mongoose';
import { LibrarySettings } from './schemas/library-settings.schema';
import { CreateLibrarySettingsDto, UpdateLibrarySettingsDto } from './dto/create-library-settings.dto';
export declare class LibrarySettingsService {
    private librarySettingsModel;
    constructor(librarySettingsModel: Model<any>);
    create(createLibrarySettingsDto: CreateLibrarySettingsDto): Promise<LibrarySettings>;
    findAll(): Promise<LibrarySettings[]>;
    findOne(id: string): Promise<LibrarySettings>;
    update(id: string, updateLibrarySettingsDto: UpdateLibrarySettingsDto): Promise<LibrarySettings>;
    remove(id: string): Promise<void>;
}
