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
exports.PublishersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publisher_schema_1 = require("./publisher.schema");
let PublishersService = class PublishersService {
    publisherModel;
    constructor(publisherModel) {
        this.publisherModel = publisherModel;
    }
    async create(data) {
        return this.publisherModel.create(data);
    }
    async findAll() {
        return this.publisherModel.find();
    }
    async findOne(id) {
        const publisher = await this.publisherModel.findById(id);
        if (!publisher)
            throw new common_1.NotFoundException('Publisher not found');
        return publisher;
    }
    async update(id, data) {
        const updatedPublisher = await this.publisherModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPublisher)
            throw new common_1.NotFoundException('Publisher not found');
        return updatedPublisher;
    }
    async delete(id) {
        const deletedPublisher = await this.publisherModel.findByIdAndDelete(id);
        if (!deletedPublisher)
            throw new common_1.NotFoundException('Publisher not found');
        return deletedPublisher;
    }
};
exports.PublishersService = PublishersService;
exports.PublishersService = PublishersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publisher_schema_1.Publisher.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PublishersService);
//# sourceMappingURL=publishers.service.js.map