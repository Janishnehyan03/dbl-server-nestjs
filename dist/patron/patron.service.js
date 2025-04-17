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
exports.PatronService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const patron_schema_1 = require("./patron.schema");
let PatronService = class PatronService {
    patronModel;
    constructor(patronModel) {
        this.patronModel = patronModel;
    }
    async createBulk(patrons) {
        try {
            const patronsToInsert = patrons.data.map((patron) => ({
                ...patron,
                ...patrons.metadata,
            }));
            return (await this.patronModel.insertMany(patronsToInsert));
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException(`Failed to insert patrons: ${error.message}`);
        }
    }
    async findAll(filter = {}) {
        let patrons = await this.patronModel
            .find(filter)
            .populate(['section', 'division', 'department', 'class', 'role'])
            .exec();
        if (!patrons.length)
            throw new common_1.NotFoundException(`No patrons found.`);
        return patrons;
    }
    async findById(id) {
        const patron = await this.patronModel
            .findById(id)
            .populate(['section', 'division', 'department', 'class', 'role'])
            .exec();
        if (!patron)
            throw new common_1.NotFoundException(`Patron with ID ${id} not found.`);
        return patron;
    }
    async update(id, updateData) {
        const updatedPatron = await this.patronModel
            .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .exec();
        if (!updatedPatron)
            throw new common_1.NotFoundException(`Patron with ID ${id} not found.`);
        return updatedPatron;
    }
    async searchPatrons(searchText) {
        if (!searchText?.trim()) {
            throw new common_1.BadRequestException('Search text is required.');
        }
        const regex = new RegExp(searchText.trim(), 'i');
        const patrons = await this.patronModel
            .find({
            $or: [{ admissionNumber: regex }, { name: regex }],
        })
            .populate(['section', 'division', 'department', 'class', 'role'])
            .exec();
        if (!patrons.length) {
            throw new common_1.NotFoundException('No patrons found matching the search criteria.');
        }
        return patrons;
    }
    async delete(id) {
        const result = await this.patronModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Patron with ID ${id} not found.`);
        return { message: 'Patron deleted successfully' };
    }
};
exports.PatronService = PatronService;
exports.PatronService = PatronService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patron_schema_1.Patron.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PatronService);
//# sourceMappingURL=patron.service.js.map