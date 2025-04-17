import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
export declare class LanguagesController {
    private readonly languageService;
    constructor(languageService: LanguagesService);
    create(createLanguageDto: CreateLanguageDto): Promise<import("./language.schema").Language>;
    findAll(): Promise<import("./language.schema").Language[]>;
    findOne(id: string): Promise<import("./language.schema").Language>;
    update(id: string, updateLanguageDto: UpdateLanguageDto): Promise<import("./language.schema").Language>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
