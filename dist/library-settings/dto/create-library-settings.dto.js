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
exports.UpdateLibrarySettingsDto = exports.CreateLibrarySettingsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Student"] = "STUDENT";
    RoleEnum["Teacher"] = "TEACHER";
})(RoleEnum || (RoleEnum = {}));
class FineDto {
    role;
    amount;
    period;
}
__decorate([
    (0, class_validator_1.IsEnum)(RoleEnum),
    __metadata("design:type", String)
], FineDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FineDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['daily', 'weekly']),
    __metadata("design:type", String)
], FineDto.prototype, "period", void 0);
class MaximumIssueDto {
    role;
    maxCount;
}
__decorate([
    (0, class_validator_1.IsEnum)(RoleEnum),
    __metadata("design:type", String)
], MaximumIssueDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], MaximumIssueDto.prototype, "maxCount", void 0);
class MaximumRenewalDto {
    role;
    maxRenewals;
}
__decorate([
    (0, class_validator_1.IsEnum)(RoleEnum),
    __metadata("design:type", String)
], MaximumRenewalDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MaximumRenewalDto.prototype, "maxRenewals", void 0);
class IssuePolicyDto {
    maximumIssues;
    maximumIssueDays;
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => MaximumIssueDto),
    __metadata("design:type", Array)
], IssuePolicyDto.prototype, "maximumIssues", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], IssuePolicyDto.prototype, "maximumIssueDays", void 0);
class RenewalPolicyDto {
    maximumRenewals;
    renewalDays;
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => MaximumRenewalDto),
    __metadata("design:type", Array)
], RenewalPolicyDto.prototype, "maximumRenewals", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RenewalPolicyDto.prototype, "renewalDays", void 0);
class CreateLibrarySettingsDto {
    libraryName;
    description;
    fines;
    issuePolicy;
    renewalPolicy;
    isClosed;
}
exports.CreateLibrarySettingsDto = CreateLibrarySettingsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLibrarySettingsDto.prototype, "libraryName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLibrarySettingsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => FineDto),
    __metadata("design:type", Array)
], CreateLibrarySettingsDto.prototype, "fines", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => IssuePolicyDto),
    __metadata("design:type", IssuePolicyDto)
], CreateLibrarySettingsDto.prototype, "issuePolicy", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => RenewalPolicyDto),
    __metadata("design:type", RenewalPolicyDto)
], CreateLibrarySettingsDto.prototype, "renewalPolicy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLibrarySettingsDto.prototype, "isClosed", void 0);
class UpdateLibrarySettingsDto {
    libraryName;
    description;
    fines;
    issuePolicy;
    renewalPolicy;
    isClosed;
}
exports.UpdateLibrarySettingsDto = UpdateLibrarySettingsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLibrarySettingsDto.prototype, "libraryName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLibrarySettingsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => FineDto),
    __metadata("design:type", Array)
], UpdateLibrarySettingsDto.prototype, "fines", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => IssuePolicyDto),
    __metadata("design:type", IssuePolicyDto)
], UpdateLibrarySettingsDto.prototype, "issuePolicy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RenewalPolicyDto),
    __metadata("design:type", RenewalPolicyDto)
], UpdateLibrarySettingsDto.prototype, "renewalPolicy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateLibrarySettingsDto.prototype, "isClosed", void 0);
//# sourceMappingURL=create-library-settings.dto.js.map