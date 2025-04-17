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
exports.SectionSchema = exports.Section = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let Section = class Section extends mongoose_2.Document {
    name;
    description;
    departments;
    classes;
    hasDepartments;
};
exports.Section = Section;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Section.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Section.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_3.Schema.Types.ObjectId, ref: 'Department' }] }),
    __metadata("design:type", Array)
], Section.prototype, "departments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_3.Schema.Types.ObjectId, ref: 'Class' }] }),
    __metadata("design:type", Array)
], Section.prototype, "classes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Section.prototype, "hasDepartments", void 0);
exports.Section = Section = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Section);
exports.SectionSchema = mongoose_1.SchemaFactory.createForClass(Section);
//# sourceMappingURL=section.schema.js.map