import { LocationService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<import("./location.schema").Location>;
    findAll(): Promise<import("./location.schema").Location[]>;
    findOne(id: string): Promise<import("./location.schema").Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<import("./location.schema").Location>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
