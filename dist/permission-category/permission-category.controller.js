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
exports.PermissionCategoryController = void 0;
const common_1 = require("@nestjs/common");
const permission_category_service_1 = require("./permission-category.service");
let PermissionCategoryController = class PermissionCategoryController {
    permissionCategoryService;
    constructor(permissionCategoryService) {
        this.permissionCategoryService = permissionCategoryService;
    }
    async create(name, permissions) {
        return this.permissionCategoryService.create(name, permissions);
    }
    async findAll() {
        return this.permissionCategoryService.findAll();
    }
    async findById(id) {
        return this.permissionCategoryService.findById(id);
    }
    async update(id, name, permissions) {
        return this.permissionCategoryService.update(id, name, permissions);
    }
    async delete(id) {
        return this.permissionCategoryService.delete(id);
    }
};
exports.PermissionCategoryController = PermissionCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "delete", null);
exports.PermissionCategoryController = PermissionCategoryController = __decorate([
    (0, common_1.Controller)('permission-categories'),
    __metadata("design:paramtypes", [permission_category_service_1.PermissionCategoryService])
], PermissionCategoryController);
//# sourceMappingURL=permission-category.controller.js.map