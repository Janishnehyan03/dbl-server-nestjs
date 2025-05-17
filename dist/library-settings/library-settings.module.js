"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrarySettingsModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const library_settings_schema_1 = require("./schemas/library-settings.schema");
const library_settings_service_1 = require("./library-settings.service");
const library_settings_controller_1 = require("./library-settings.controller");
let LibrarySettingsModule = class LibrarySettingsModule {
};
exports.LibrarySettingsModule = LibrarySettingsModule;
exports.LibrarySettingsModule = LibrarySettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: library_settings_schema_1.LibrarySettings.name, schema: library_settings_schema_1.LibrarySettingsSchema },
            ]),
        ],
        providers: [library_settings_service_1.LibrarySettingsService],
        controllers: [library_settings_controller_1.LibrarySettingsController],
        exports: [library_settings_service_1.LibrarySettingsService],
    })
], LibrarySettingsModule);
//# sourceMappingURL=library-settings.module.js.map