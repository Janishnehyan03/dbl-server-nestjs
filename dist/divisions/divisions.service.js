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
exports.DivisionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const division_schema_1 = require("./division.schema");
let DivisionService = class DivisionService {
    divisionModel;
    constructor(divisionModel) {
        this.divisionModel = divisionModel;
    }
    async create(name) {
        return this.divisionModel.create({ name });
    }
    async findAll() {
        return this.divisionModel.find().exec();
    }
    async findById(id) {
        const division = await this.divisionModel.findById(id).exec();
        if (!division)
            throw new common_1.NotFoundException('Division not found');
        return division;
    }
    async update(id, name) {
        const updatedDivision = await this.divisionModel
            .findByIdAndUpdate(id, { name }, { new: true })
            .exec();
        if (!updatedDivision)
            throw new common_1.NotFoundException('Division not found');
        return updatedDivision;
    }
    async delete(id) {
        const deletedDivision = await this.divisionModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedDivision)
            throw new common_1.NotFoundException('Division not found');
        return deletedDivision;
    }
};
exports.DivisionService = DivisionService;
exports.DivisionService = DivisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(division_schema_1.Division.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DivisionService);
//# sourceMappingURL=divisions.service.js.map