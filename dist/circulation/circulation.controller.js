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
exports.CirculationController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const circulation_service_1 = require("./circulation.service");
const issue_book_dto_1 = require("./dto/issue-book.dto");
const renew_book_dto_1 = require("./dto/renew-book.dto");
const return_book_dto_1 = require("./dto/return-book.dto");
let CirculationController = class CirculationController {
    circulationService;
    constructor(circulationService) {
        this.circulationService = circulationService;
    }
    async issueBook(issueBookDto, user) {
        return this.circulationService.issueBook(issueBookDto, user._id);
    }
    async returnBook(returnBookDto, user) {
        return this.circulationService.returnBook(returnBookDto, user._id);
    }
    async renewBook(renewBookDto, user) {
        return this.circulationService.renewBook(renewBookDto, user._id);
    }
    async getOverdueBooks() {
        return this.circulationService.getOverdueBooks();
    }
    async getPatronBooks(patronId) {
        return this.circulationService.getPatronBooks(patronId);
    }
    async calculatePatronFines(patronId) {
        return {
            fines: await this.circulationService.calculatePatronFines(patronId),
        };
    }
};
exports.CirculationController = CirculationController;
__decorate([
    (0, common_1.Post)('issue'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_book_dto_1.IssueBookDto, Object]),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "issueBook", null);
__decorate([
    (0, common_1.Post)('return'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [return_book_dto_1.ReturnBookDto, Object]),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Post)('renew'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [renew_book_dto_1.RenewBookDto, Object]),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "renewBook", null);
__decorate([
    (0, common_1.Get)('overdue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "getOverdueBooks", null);
__decorate([
    (0, common_1.Get)('patron/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "getPatronBooks", null);
__decorate([
    (0, common_1.Get)('fines/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CirculationController.prototype, "calculatePatronFines", null);
exports.CirculationController = CirculationController = __decorate([
    (0, common_1.Controller)('circulations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [circulation_service_1.CirculationService])
], CirculationController);
//# sourceMappingURL=circulation.controller.js.map