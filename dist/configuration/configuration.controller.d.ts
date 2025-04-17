import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto, UpdateConfigurationDto } from './dto/configuration.dto';
export declare class ConfigurationController {
    private readonly configService;
    constructor(configService: ConfigurationService);
    create(createConfigDto: CreateConfigurationDto): Promise<import("./configuration.schema").Configuration>;
    findAll(): Promise<import("./configuration.schema").Configuration[]>;
    findOne(id: string): Promise<import("./configuration.schema").Configuration>;
    update(id: string, updateConfigDto: UpdateConfigurationDto): Promise<import("./configuration.schema").Configuration>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
