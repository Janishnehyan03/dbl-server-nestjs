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
exports.CirculationSchema = exports.Circulation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Circulation = class Circulation {
    book;
    patron;
    issueDate;
    dueDate;
    returnDate;
    status;
    renewals;
    createdBy;
    notes;
};
exports.Circulation = Circulation;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Book', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Circulation.prototype, "book", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patron', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Circulation.prototype, "patron", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Circulation.prototype, "issueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Circulation.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Circulation.prototype, "returnDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['issued', 'returned', 'overdue', 'lost'], default: 'issued' }),
    __metadata("design:type", String)
], Circulation.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Circulation.prototype, "renewals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Circulation.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Circulation.prototype, "notes", void 0);
exports.Circulation = Circulation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Circulation);
exports.CirculationSchema = mongoose_1.SchemaFactory.createForClass(Circulation);
//# sourceMappingURL=circulation.schema.js.map