"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permission_category_schema_1 = require("./permission-category.schema");
const permission_category_service_1 = require("./permission-category.service");
const permission_category_controller_1 = require("./permission-category.controller");
let PermissionCategoryModule = class PermissionCategoryModule {
};
exports.PermissionCategoryModule = PermissionCategoryModule;
exports.PermissionCategoryModule = PermissionCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: permission_category_schema_1.PermissionCategory.name, schema: permission_category_schema_1.PermissionCategorySchema }])],
        controllers: [permission_category_controller_1.PermissionCategoryController],
        providers: [permission_category_service_1.PermissionCategoryService],
        exports: [permission_category_service_1.PermissionCategoryService],
    })
], PermissionCategoryModule);
//# sourceMappingURL=permission-category.module.js.map