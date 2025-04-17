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
exports.PermissionCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const permission_category_schema_1 = require("./permission-category.schema");
let PermissionCategoryService = class PermissionCategoryService {
    permissionCategoryModel;
    constructor(permissionCategoryModel) {
        this.permissionCategoryModel = permissionCategoryModel;
    }
    async create(name, permissions) {
        return this.permissionCategoryModel.create({ name, permissions });
    }
    async findAll() {
        return this.permissionCategoryModel.find().exec();
    }
    async findById(id) {
        const category = await this.permissionCategoryModel.findById(id).exec();
        if (!category)
            throw new common_1.NotFoundException('Permission category not found');
        return category;
    }
    async update(id, name, permissions) {
        let updatedCategory = await this.permissionCategoryModel
            .findByIdAndUpdate(id, { name, permissions }, { new: true })
            .exec();
        if (!updatedCategory)
            throw new common_1.NotFoundException('Permission category not found');
        return updatedCategory;
    }
    async delete(id) {
        const deletedCategory = await this.permissionCategoryModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedCategory)
            throw new common_1.NotFoundException('Permission category not found');
        return deletedCategory;
    }
};
exports.PermissionCategoryService = PermissionCategoryService;
exports.PermissionCategoryService = PermissionCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_category_schema_1.PermissionCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PermissionCategoryService);
//# sourceMappingURL=permission-category.service.js.map