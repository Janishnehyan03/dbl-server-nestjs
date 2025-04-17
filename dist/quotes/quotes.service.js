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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quotes_schema_1 = require("./quotes.schema");
let QuotesService = class QuotesService {
    quoteModel;
    constructor(quoteModel) {
        this.quoteModel = quoteModel;
    }
    async create(createQuoteDto) {
        const newQuote = new this.quoteModel(createQuoteDto);
        return newQuote.save();
    }
    async findAll() {
        return this.quoteModel.find().exec();
    }
    async findOne(id) {
        const quote = await this.quoteModel.findById(id).exec();
        if (!quote)
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
        return quote;
    }
    async update(id, updateQuoteDto) {
        const updatedQuote = await this.quoteModel.findByIdAndUpdate(id, updateQuoteDto, { new: true });
        if (!updatedQuote)
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
        return updatedQuote;
    }
    async remove(id) {
        const result = await this.quoteModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quotes_schema_1.Quote.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuotesService);
//# sourceMappingURL=quotes.service.js.map