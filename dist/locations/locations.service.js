"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("./location.schema");
let LocationService = class LocationService {
    locationModel;
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async create(createLocationDto) {
        return this.locationModel.create(createLocationDto);
    }
    async findAll() {
        return this.locationModel.find().exec();
    }
    async findOne(id) {
        const location = await this.locationModel.findById(id).exec();
        if (!location)
            throw new common_1.NotFoundException('Location not found');
        return location;
    }
    async update(id, updateLocationDto) {
        const updatedLocation = await this.locationModel
            .findByIdAndUpdate(id, updateLocationDto, { new: true })
            .exec();
        if (!updatedLocation)
            throw new common_1.NotFoundException('Location not found');
        return updatedLocation;
    }
    async delete(id) {
        const deletedLocation = await this.locationModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedLocation)
            throw new common_1.NotFoundException('Location not found');
        return { message: 'Location deleted successfully' };
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(location_schema_1.Location.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationService);
//# sourceMappingURL=locations.service.js.map