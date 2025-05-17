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
exports.LibrarySettingsController = void 0;
const common_1 = require("@nestjs/common");
const library_settings_service_1 = require("./library-settings.service");
const create_library_settings_dto_1 = require("./dto/create-library-settings.dto");
let LibrarySettingsController = class LibrarySettingsController {
    librarySettingsService;
    constructor(librarySettingsService) {
        this.librarySettingsService = librarySettingsService;
    }
    async create(createLibrarySettingsDto) {
        return this.librarySettingsService.create(createLibrarySettingsDto);
    }
    async findAll() {
        return this.librarySettingsService.findAll();
    }
    async findOne(id) {
        return this.librarySettingsService.findOne(id);
    }
    async update(id, updateLibrarySettingsDto) {
        return this.librarySettingsService.update(id, updateLibrarySettingsDto);
    }
    async remove(id) {
        return this.librarySettingsService.remove(id);
    }
};
exports.LibrarySettingsController = LibrarySettingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_library_settings_dto_1.CreateLibrarySettingsDto]),
    __metadata("design:returntype", Promise)
], LibrarySettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LibrarySettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LibrarySettingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_library_settings_dto_1.UpdateLibrarySettingsDto]),
    __metadata("design:returntype", Promise)
], LibrarySettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LibrarySettingsController.prototype, "remove", null);
exports.LibrarySettingsController = LibrarySettingsController = __decorate([
    (0, common_1.Controller)('library-settings'),
    __metadata("design:paramtypes", [library_settings_service_1.LibrarySettingsService])
], LibrarySettingsController);
//# sourceMappingURL=library-settings.controller.js.map