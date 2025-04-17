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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const section_schema_1 = require("./section.schema");
let SectionsService = class SectionsService {
    sectionModel;
    constructor(sectionModel) {
        this.sectionModel = sectionModel;
    }
    async create(createSectionDto) {
        return this.sectionModel.create(createSectionDto);
    }
    async findAll() {
        return this.sectionModel.find().exec();
    }
    async findOne(id) {
        const section = await this.sectionModel.findById(id).exec();
        if (!section)
            throw new common_1.NotFoundException('Section not found');
        return section;
    }
    async update(id, updateSectionDto) {
        const updatedSection = await this.sectionModel.findByIdAndUpdate(id, updateSectionDto, { new: true }).exec();
        if (!updatedSection)
            throw new common_1.NotFoundException('Section not found');
        return updatedSection;
    }
    async delete(id) {
        const deletedSection = await this.sectionModel.findByIdAndDelete(id).exec();
        if (!deletedSection)
            throw new common_1.NotFoundException('Section not found');
        return { message: 'Section deleted successfully' };
    }
};
exports.SectionsService = SectionsService;
exports.SectionsService = SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(section_schema_1.Section.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SectionsService);
//# sourceMappingURL=sections.service.js.map