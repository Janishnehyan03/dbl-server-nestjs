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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const author_schema_1 = require("./author.schema");
let AuthorsService = class AuthorsService {
    authorModel;
    constructor(authorModel) {
        this.authorModel = authorModel;
    }
    async create(dto) {
        return this.authorModel.create(dto);
    }
    async findAll() {
        return this.authorModel.find();
    }
    async findOne(id) {
        const author = await this.authorModel.findById(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return author;
    }
    async update(id, dto) {
        const author = await this.authorModel.findByIdAndUpdate(id, dto, { new: true });
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return author;
    }
    async remove(id) {
        const author = await this.authorModel.findByIdAndDelete(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found');
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(author_schema_1.Author.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map