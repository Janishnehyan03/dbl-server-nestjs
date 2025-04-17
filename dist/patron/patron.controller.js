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
exports.PatronController = void 0;
const common_1 = require("@nestjs/common");
const patron_service_1 = require("./patron.service");
let PatronController = class PatronController {
    patronService;
    constructor(patronService) {
        this.patronService = patronService;
    }
    async createBulk(patrons) {
        return this.patronService.createBulk(patrons);
    }
    async findAll(query) {
        return this.patronService.findAll(query);
    }
    async findById(id) {
        return this.patronService.findById(id);
    }
    async searchPatrons(search) {
        return this.patronService.searchPatrons(search);
    }
    async update(id, updateData) {
        return this.patronService.update(id, updateData);
    }
    async delete(id) {
        return this.patronService.delete(id);
    }
};
exports.PatronController = PatronController;
__decorate([
    (0, common_1.Post)('bulk-insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('search/data'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "searchPatrons", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatronController.prototype, "delete", null);
exports.PatronController = PatronController = __decorate([
    (0, common_1.Controller)('patrons'),
    __metadata("design:paramtypes", [patron_service_1.PatronService])
], PatronController);
//# sourceMappingURL=patron.controller.js.map