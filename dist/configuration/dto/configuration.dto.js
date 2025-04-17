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
exports.UpdateConfigurationDto = exports.CreateConfigurationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateConfigurationDto {
    libraryTitle;
    description;
    email;
    contactNumber;
    openingDays;
    openingTime;
    closingTime;
    maxBooksPerUser;
    borrowDurationDays;
    finePerDay;
    isActive;
}
exports.CreateConfigurationDto = CreateConfigurationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "libraryTitle", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateConfigurationDto.prototype, "openingDays", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "openingTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfigurationDto.prototype, "closingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateConfigurationDto.prototype, "maxBooksPerUser", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateConfigurationDto.prototype, "borrowDurationDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateConfigurationDto.prototype, "finePerDay", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateConfigurationDto.prototype, "isActive", void 0);
class UpdateConfigurationDto extends CreateConfigurationDto {
}
exports.UpdateConfigurationDto = UpdateConfigurationDto;
//# sourceMappingURL=configuration.dto.js.map