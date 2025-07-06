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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_stats_dto_1 = require("./dto/dashboard-stats.dto");
const swagger_1 = require("@nestjs/swagger");
const recent_activity_dto_1 = require("./dto/recent-activity.dto");
const overdue_reminder_dto_1 = require("./dto/overdue-reminder.dto");
const top_borrowed_book_dto_1 = require("./dto/top-borrowed-book.dto");
const monthly_stats_dto_1 = require("./dto/monthly-stats.dto");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getStats() {
        return this.dashboardService.getStats();
    }
    async getRecentActivities(limit) {
        return this.dashboardService.getRecentActivities(limit);
    }
    async getTopBorrowedBooks() {
        return this.dashboardService.getTopBorrowedBooks();
    }
    async getOverdueReminders() {
        return this.dashboardService.getOverdueReminders();
    }
    async getMonthlyStats(year, month) {
        return this.dashboardService.getMonthlyStats(year, month);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get key library statistics' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved library statistics.',
        type: dashboard_stats_dto_1.DashboardStatsDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('recent-activities'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a timeline of recent library activities' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved recent activities.',
        type: recent_activity_dto_1.RecentActivitiesDto,
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentActivities", null);
__decorate([
    (0, common_1.Get)('top-borrowed-books'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of the most borrowed books' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved top borrowed books.',
        type: [top_borrowed_book_dto_1.TopBorrowedBookDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTopBorrowedBooks", null);
__decorate([
    (0, common_1.Get)('overdue-reminders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of overdue books' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved overdue book reminders.',
        type: [overdue_reminder_dto_1.OverdueReminderDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getOverdueReminders", null);
__decorate([
    (0, common_1.Get)('monthly-stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get monthly statistics for book issues and returns',
    }),
    (0, swagger_1.ApiOkResponse)({ type: monthly_stats_dto_1.MonthlyStatsDto }),
    __param(0, (0, common_1.Query)('year', new common_1.DefaultValuePipe(new Date().getFullYear()), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month', new common_1.DefaultValuePipe(new Date().getMonth() + 1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getMonthlyStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map