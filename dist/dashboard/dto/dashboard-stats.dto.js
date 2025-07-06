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
exports.DashboardStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DashboardStatsDto {
    totalBooks;
    totalPatrons;
    totalFines;
    overdueBooks;
    booksIssuedToday;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12500,
        description: 'Total number of unique book titles in the library.',
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalBooks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3200,
        description: 'Total number of registered patrons.',
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalPatrons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 245.75,
        description: 'Sum of all outstanding fines across all circulations.',
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalFines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 47,
        description: 'Number of books currently checked out past their due date.',
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "overdueBooks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 23,
        description: 'Number of books issued to patrons today.',
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "booksIssuedToday", void 0);
//# sourceMappingURL=dashboard-stats.dto.js.map