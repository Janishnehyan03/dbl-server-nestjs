import { DivisionService } from './divisions.service';
import { Division } from './division.schema';
export declare class DivisionController {
    private readonly divisionService;
    constructor(divisionService: DivisionService);
    create(name: string): Promise<Division>;
    findAll(): Promise<Division[]>;
    findById(id: string): Promise<Division>;
    update(id: string, name: string): Promise<Division>;
    delete(id: string): Promise<Division>;
}
