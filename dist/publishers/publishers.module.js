"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const publisher_schema_1 = require("./publisher.schema");
const publishers_service_1 = require("./publishers.service");
const publishers_controller_1 = require("./publishers.controller");
let PublishersModule = class PublishersModule {
};
exports.PublishersModule = PublishersModule;
exports.PublishersModule = PublishersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: publisher_schema_1.Publisher.name, schema: publisher_schema_1.PublisherSchema }]),
        ],
        controllers: [publishers_controller_1.PublishersController],
        providers: [publishers_service_1.PublishersService],
    })
], PublishersModule);
//# sourceMappingURL=publishers.module.js.map