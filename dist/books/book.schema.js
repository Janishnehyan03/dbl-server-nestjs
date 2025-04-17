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
exports.BookSchema = exports.Book = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Book = class Book {
    title;
    accNumber;
    callNumber;
    authors;
    categories;
    pages;
    edition;
    issn;
    location;
    publisher;
    language;
    price;
    isNewArrival;
    status;
    publishedDate;
    isbn;
    published;
    keywords;
    currentHolder;
    lastIssueDate;
    totalIssues;
};
exports.Book = Book;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Book.prototype, "accNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Book.prototype, "callNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Schema.Types.ObjectId],
        default: [],
        ref: 'Author',
    }),
    __metadata("design:type", Array)
], Book.prototype, "authors", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Schema.Types.ObjectId],
        default: [],
        ref: 'Category',
    }),
    __metadata("design:type", Array)
], Book.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Book.prototype, "pages", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "edition", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "issn", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId,
        ref: 'Location',
    }),
    __metadata("design:type", String)
], Book.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId,
        ref: 'Publisher',
    }),
    __metadata("design:type", String)
], Book.prototype, "publisher", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId,
        ref: 'Language',
    }),
    __metadata("design:type", String)
], Book.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Book.prototype, "isNewArrival", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'available',
        enum: ['available', 'checked_out', 'lost', 'damaged'],
    }),
    __metadata("design:type", String)
], Book.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "publishedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Book.prototype, "published", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Book.prototype, "keywords", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId,
        ref: 'Patron',
        default: null,
    }),
    __metadata("design:type", String)
], Book.prototype, "currentHolder", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Book.prototype, "lastIssueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "totalIssues", void 0);
exports.Book = Book = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Book);
exports.BookSchema = mongoose_1.SchemaFactory.createForClass(Book);
//# sourceMappingURL=book.schema.js.map