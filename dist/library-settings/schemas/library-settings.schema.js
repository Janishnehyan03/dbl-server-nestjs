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
exports.LibrarySettingsSchema = exports.LibrarySettings = exports.RenewalPolicy = exports.IssuePolicy = exports.MaximumRenewal = exports.MaximumIssue = exports.Fine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Student"] = "STUDENT";
    RoleEnum["Teacher"] = "TEACHER";
})(RoleEnum || (RoleEnum = {}));
let Fine = class Fine {
    role;
    amount;
    period;
};
exports.Fine = Fine;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: RoleEnum,
    }),
    __metadata("design:type", String)
], Fine.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Fine.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['daily', 'weekly'], default: 'daily' }),
    __metadata("design:type", String)
], Fine.prototype, "period", void 0);
exports.Fine = Fine = __decorate([
    (0, mongoose_1.Schema)({ _id: false, timestamps: false })
], Fine);
let MaximumIssue = class MaximumIssue {
    role;
    maxCount;
};
exports.MaximumIssue = MaximumIssue;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: RoleEnum,
    }),
    __metadata("design:type", String)
], MaximumIssue.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], MaximumIssue.prototype, "maxCount", void 0);
exports.MaximumIssue = MaximumIssue = __decorate([
    (0, mongoose_1.Schema)({ _id: false, timestamps: false })
], MaximumIssue);
let MaximumRenewal = class MaximumRenewal {
    role;
    maxRenewals;
};
exports.MaximumRenewal = MaximumRenewal;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: RoleEnum,
    }),
    __metadata("design:type", String)
], MaximumRenewal.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], MaximumRenewal.prototype, "maxRenewals", void 0);
exports.MaximumRenewal = MaximumRenewal = __decorate([
    (0, mongoose_1.Schema)({ _id: false, timestamps: false })
], MaximumRenewal);
let IssuePolicy = class IssuePolicy {
    maximumIssues;
    maximumIssueDays;
};
exports.IssuePolicy = IssuePolicy;
__decorate([
    (0, mongoose_1.Prop)({
        type: [MaximumIssue],
        required: true,
        validate: {
            validator: (issues) => {
                const roles = issues.map((issue) => issue.role.toString());
                return roles.length === new Set(roles).size;
            },
            message: 'Duplicate roles found in maximumIssues',
        },
    }),
    __metadata("design:type", Array)
], IssuePolicy.prototype, "maximumIssues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], IssuePolicy.prototype, "maximumIssueDays", void 0);
exports.IssuePolicy = IssuePolicy = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], IssuePolicy);
let RenewalPolicy = class RenewalPolicy {
    maximumRenewals;
    renewalDays;
};
exports.RenewalPolicy = RenewalPolicy;
__decorate([
    (0, mongoose_1.Prop)({
        type: [MaximumRenewal],
        required: true,
        validate: {
            validator: (renewals) => {
                const roles = renewals.map((renewal) => renewal.role.toString());
                return roles.length === new Set(roles).size;
            },
            message: 'Duplicate roles found in maximumRenewals',
        },
    }),
    __metadata("design:type", Array)
], RenewalPolicy.prototype, "maximumRenewals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], RenewalPolicy.prototype, "renewalDays", void 0);
exports.RenewalPolicy = RenewalPolicy = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], RenewalPolicy);
let LibrarySettings = class LibrarySettings extends mongoose_2.Document {
    libraryName;
    description;
    fines;
    issuePolicy;
    renewalPolicy;
    isClosed;
};
exports.LibrarySettings = LibrarySettings;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, index: true }),
    __metadata("design:type", String)
], LibrarySettings.prototype, "libraryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], LibrarySettings.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [Fine],
        default: [],
        validate: {
            validator: (fines) => {
                const roles = fines.map((fine) => fine.role.toString());
                return roles.length === new Set(roles).size;
            },
            message: 'Duplicate roles found in fines',
        },
    }),
    __metadata("design:type", Array)
], LibrarySettings.prototype, "fines", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: IssuePolicy, required: true }),
    __metadata("design:type", IssuePolicy)
], LibrarySettings.prototype, "issuePolicy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: RenewalPolicy, required: true }),
    __metadata("design:type", RenewalPolicy)
], LibrarySettings.prototype, "renewalPolicy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], LibrarySettings.prototype, "isClosed", void 0);
exports.LibrarySettings = LibrarySettings = __decorate([
    (0, mongoose_1.Schema)({ collection: 'library_settings', timestamps: true })
], LibrarySettings);
exports.LibrarySettingsSchema = mongoose_1.SchemaFactory.createForClass(LibrarySettings);
exports.LibrarySettingsSchema.index({ libraryName: 1, isClosed: 1 });
exports.LibrarySettingsSchema.pre('save', function (next) {
    const studentIssue = this.issuePolicy.maximumIssues.find((issue) => issue.role.toString() === RoleEnum.Student);
    const teacherIssue = this.issuePolicy.maximumIssues.find((issue) => issue.role.toString() === RoleEnum.Teacher);
    const studentRenewal = this.renewalPolicy.maximumRenewals.find((renewal) => renewal.role.toString() === RoleEnum.Student);
    const teacherRenewal = this.renewalPolicy.maximumRenewals.find((renewal) => renewal.role.toString() === RoleEnum.Teacher);
    if (studentIssue &&
        teacherIssue &&
        studentIssue.maxCount > teacherIssue.maxCount) {
        throw new Error('Student max issue count cannot exceed teacher max issue count');
    }
    if (studentRenewal &&
        teacherRenewal &&
        studentRenewal.maxRenewals > teacherRenewal.maxRenewals) {
        throw new Error('Student max renewals cannot exceed teacher max renewals');
    }
    next();
});
//# sourceMappingURL=library-settings.schema.js.map