import { Model } from 'mongoose';
import { Configuration, ConfigurationDocument } from './configuration.schema';
import { CreateConfigurationDto, UpdateConfigurationDto } from './dto/configuration.dto';
export declare class ConfigurationService {
    private configModel;
    constructor(configModel: Model<ConfigurationDocument>);
    create(data: CreateConfigurationDto): Promise<Configuration>;
    findAll(): Promise<Configuration[]>;
    findOne(id: string): Promise<Configuration>;
    update(id: string, updateData: UpdateConfigurationDto): Promise<Configuration>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
