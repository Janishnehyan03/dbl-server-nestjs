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
exports.LibrarySettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const library_settings_schema_1 = require("./schemas/library-settings.schema");
let LibrarySettingsService = class LibrarySettingsService {
    librarySettingsModel;
    constructor(librarySettingsModel) {
        this.librarySettingsModel = librarySettingsModel;
    }
    async create(createLibrarySettingsDto) {
        console.log('Creating library settings with data:', createLibrarySettingsDto);
        const existingSettings = await this.librarySettingsModel.findOne({
            libraryName: createLibrarySettingsDto.libraryName,
        });
        if (existingSettings) {
            throw new common_1.BadRequestException('Library with this name already exists');
        }
        const createdSettings = new this.librarySettingsModel(createLibrarySettingsDto);
        return createdSettings.save();
    }
    async findAll() {
        return this.librarySettingsModel.find().exec();
    }
    async findOne(id) {
        const settings = await this.librarySettingsModel.findById(id).exec();
        if (!settings) {
            throw new common_1.NotFoundException(`Library settings with ID ${id} not found`);
        }
        return settings;
    }
    async update(id, updateLibrarySettingsDto) {
        const existingSettings = await this.librarySettingsModel
            .findById(id)
            .exec();
        if (!existingSettings) {
            throw new common_1.NotFoundException(`Library settings with ID ${id} not found`);
        }
        if (updateLibrarySettingsDto.libraryName &&
            updateLibrarySettingsDto.libraryName !== existingSettings.libraryName) {
            const nameExists = await this.librarySettingsModel.findOne({
                libraryName: updateLibrarySettingsDto.libraryName,
            });
            if (nameExists) {
                throw new common_1.BadRequestException('Library with this name already exists');
            }
        }
        return this.librarySettingsModel
            .findByIdAndUpdate(id, updateLibrarySettingsDto, { new: true })
            .exec();
    }
    async remove(id) {
        const result = await this.librarySettingsModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Library settings with ID ${id} not found`);
        }
    }
};
exports.LibrarySettingsService = LibrarySettingsService;
exports.LibrarySettingsService = LibrarySettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(library_settings_schema_1.LibrarySettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LibrarySettingsService);
//# sourceMappingURL=library-settings.service.js.map