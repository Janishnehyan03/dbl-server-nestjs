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
exports.RecentActivitiesDto = exports.RecentActivityItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecentActivityItemDto {
    type;
    description;
    timestamp;
}
exports.RecentActivityItemDto = RecentActivityItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of the activity.',
        example: 'Book Issued',
    }),
    __metadata("design:type", String)
], RecentActivityItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A human-readable description of the event.',
        example: 'The Great Gatsby issued to John Doe',
    }),
    __metadata("design:type", String)
], RecentActivityItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The timestamp of when the event occurred.',
        example: '2023-11-30T09:15:00.000Z',
    }),
    __metadata("design:type", Date)
], RecentActivityItemDto.prototype, "timestamp", void 0);
class RecentActivitiesDto extends Array {
}
exports.RecentActivitiesDto = RecentActivitiesDto;
//# sourceMappingURL=recent-activity.dto.js.map