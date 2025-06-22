"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatronModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const patron_schema_1 = require("./patron.schema");
const patron_service_1 = require("./patron.service");
const patron_controller_1 = require("./patron.controller");
const circulation_schema_1 = require("../circulation/schemas/circulation.schema");
let PatronModule = class PatronModule {
};
exports.PatronModule = PatronModule;
exports.PatronModule = PatronModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: patron_schema_1.Patron.name, schema: patron_schema_1.PatronSchema },
                {
                    name: circulation_schema_1.Circulation.name,
                    schema: circulation_schema_1.CirculationSchema,
                },
            ]),
        ],
        controllers: [patron_controller_1.PatronController],
        providers: [patron_service_1.PatronService],
        exports: [patron_service_1.PatronService],
    })
], PatronModule);
//# sourceMappingURL=patron.module.js.map