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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("./class.schema");
let ClassesService = class ClassesService {
    classModel;
    constructor(classModel) {
        this.classModel = classModel;
    }
    async create(name, section, division) {
        return this.classModel.create({ name, section, division });
    }
    async findAll() {
        let classes = await this.classModel
            .find()
            .populate('section division')
            .exec();
        return classes;
    }
    async findById(id) {
        const classData = await this.classModel
            .findById(id)
            .populate('section division')
            .exec();
        if (!classData)
            throw new common_1.NotFoundException('Class not found');
        return classData;
    }
    async update(id, name, section, division) {
        let updatedClass = await this.classModel
            .findByIdAndUpdate(id, { name, section, division }, { new: true })
            .exec();
        if (!updatedClass)
            throw new common_1.NotFoundException('Class not found');
        return updatedClass;
    }
    async delete(id) {
        const deletedClass = await this.classModel.findByIdAndDelete(id).exec();
        if (!deletedClass)
            throw new common_1.NotFoundException('Class not found');
        return deletedClass;
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassesService);
//# sourceMappingURL=classes.service.js.map