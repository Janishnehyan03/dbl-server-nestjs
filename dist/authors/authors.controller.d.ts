import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    create(createAuthorDto: CreateAuthorDto): Promise<import("./author.schema").Author>;
    findAll(): Promise<import("./author.schema").Author[]>;
    findOne(id: string): Promise<import("./author.schema").Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<import("./author.schema").Author>;
    remove(id: string): Promise<void>;
}
