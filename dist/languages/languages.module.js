"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const languages_service_1 = require("./languages.service");
const languages_controller_1 = require("./languages.controller");
const language_schema_1 = require("./language.schema");
let LanguagesModule = class LanguagesModule {
};
exports.LanguagesModule = LanguagesModule;
exports.LanguagesModule = LanguagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: language_schema_1.Language.name, schema: language_schema_1.LanguageSchema },
            ]),
        ],
        controllers: [languages_controller_1.LanguagesController],
        providers: [languages_service_1.LanguagesService],
        exports: [languages_service_1.LanguagesService],
    })
], LanguagesModule);
//# sourceMappingURL=languages.module.js.map