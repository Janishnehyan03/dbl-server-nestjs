import { Model } from 'mongoose';
import { Author } from './author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorsService {
    private authorModel;
    constructor(authorModel: Model<Author>);
    create(dto: CreateAuthorDto): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: string): Promise<Author>;
    update(id: string, dto: UpdateAuthorDto): Promise<Author>;
    remove(id: string): Promise<void>;
}
