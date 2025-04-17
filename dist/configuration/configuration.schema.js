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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationSchema = exports.Configuration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Configuration = class Configuration {
    libraryTitle;
    description;
    email;
    contactNumber;
    openingDays;
    openingTime;
    closingTime;
    maxBooksPerStudent;
    maxBooksPerTeacher;
    borrowDurationDays;
    finePerDay;
    isActive;
};
exports.Configuration = Configuration;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "libraryTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "contactNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Configuration.prototype, "openingDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "openingTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Configuration.prototype, "closingTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 5 }),
    __metadata("design:type", Number)
], Configuration.prototype, "maxBooksPerStudent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 10 }),
    __metadata("design:type", Number)
], Configuration.prototype, "maxBooksPerTeacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 14 }),
    __metadata("design:type", Number)
], Configuration.prototype, "borrowDurationDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 2 }),
    __metadata("design:type", Number)
], Configuration.prototype, "finePerDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Configuration.prototype, "isActive", void 0);
exports.Configuration = Configuration = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Configuration);
exports.ConfigurationSchema = mongoose_1.SchemaFactory.createForClass(Configuration);
//# sourceMappingURL=configuration.schema.js.map