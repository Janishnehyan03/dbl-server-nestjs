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
exports.PatronSchema = exports.Patron = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Patron = class Patron {
    name;
    admissionNumber;
    section;
    division;
    department;
    class;
    role;
    currentBooksIssued;
    totalBooksIssued;
    finesDue;
};
exports.Patron = Patron;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patron.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Patron.prototype, "admissionNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Section', required: true }),
    __metadata("design:type", String)
], Patron.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Division', default: null }),
    __metadata("design:type", String)
], Patron.prototype, "division", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Department',
        default: null,
    }),
    __metadata("design:type", String)
], Patron.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Class', default: null }),
    __metadata("design:type", String)
], Patron.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Role', required: true }),
    __metadata("design:type", String)
], Patron.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Patron.prototype, "currentBooksIssued", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Patron.prototype, "totalBooksIssued", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Patron.prototype, "finesDue", void 0);
exports.Patron = Patron = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Patron);
exports.PatronSchema = mongoose_1.SchemaFactory.createForClass(Patron);
//# sourceMappingURL=patron.schema.js.map