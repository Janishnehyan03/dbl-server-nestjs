import { Model } from 'mongoose';
import { Language } from './language.schema';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
export declare class LanguagesService {
    private languageModel;
    constructor(languageModel: Model<Language>);
    create(createLanguageDto: CreateLanguageDto): Promise<Language>;
    findAll(): Promise<Language[]>;
    findOne(id: string): Promise<Language>;
    update(id: string, updateLanguageDto: UpdateLanguageDto): Promise<Language>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
