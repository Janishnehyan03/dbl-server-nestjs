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
exports.MonthlyStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DailyStat {
    date;
    issued;
    returned;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-23' }),
    __metadata("design:type", String)
], DailyStat.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23 }),
    __metadata("design:type", Number)
], DailyStat.prototype, "issued", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 21 }),
    __metadata("design:type", Number)
], DailyStat.prototype, "returned", void 0);
class MonthlyStatsDto {
    month;
    totalBooksIssued;
    totalBooksReturned;
    dailyStats;
}
exports.MonthlyStatsDto = MonthlyStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'March 2025' }),
    __metadata("design:type", String)
], MonthlyStatsDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 450 }),
    __metadata("design:type", Number)
], MonthlyStatsDto.prototype, "totalBooksIssued", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 420 }),
    __metadata("design:type", Number)
], MonthlyStatsDto.prototype, "totalBooksReturned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DailyStat] }),
    __metadata("design:type", Array)
], MonthlyStatsDto.prototype, "dailyStats", void 0);
//# sourceMappingURL=monthly-stats.dto.js.map