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
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const configuration_schema_1 = require("./configuration.schema");
let ConfigurationService = class ConfigurationService {
    configModel;
    constructor(configModel) {
        this.configModel = configModel;
    }
    async create(data) {
        return new this.configModel(data).save();
    }
    async findAll() {
        return this.configModel.find().exec();
    }
    async findOne(id) {
        const config = await this.configModel.findById(id).exec();
        if (!config)
            throw new common_1.NotFoundException(`Configuration not found`);
        return config;
    }
    async update(id, updateData) {
        const updatedConfig = await this.configModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedConfig)
            throw new common_1.NotFoundException(`Configuration not found`);
        return updatedConfig;
    }
    async remove(id) {
        const result = await this.configModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0)
            throw new common_1.NotFoundException(`Configuration not found`);
        return { message: 'Configuration deleted successfully' };
    }
};
exports.ConfigurationService = ConfigurationService;
exports.ConfigurationService = ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(configuration_schema_1.Configuration.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConfigurationService);
//# sourceMappingURL=configuration.service.js.map