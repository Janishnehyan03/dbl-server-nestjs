"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CirculationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const circulation_controller_1 = require("./circulation.controller");
const circulation_service_1 = require("./circulation.service");
const transaction_schema_1 = require("./schemas/transaction.schema");
const books_module_1 = require("../books/books.module");
const patron_module_1 = require("../patron/patron.module");
const book_schema_1 = require("../books/book.schema");
const patron_schema_1 = require("../patron/patron.schema");
const jwt_1 = require("@nestjs/jwt");
let CirculationModule = class CirculationModule {
};
exports.CirculationModule = CirculationModule;
exports.CirculationModule = CirculationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema },
                {
                    name: book_schema_1.Book.name,
                    schema: book_schema_1.BookSchema,
                },
                {
                    name: patron_schema_1.Patron.name,
                    schema: patron_schema_1.PatronSchema,
                },
            ]),
            books_module_1.BooksModule,
            patron_module_1.PatronModule,
            jwt_1.JwtModule.register({
                secret: 'your_jwt_secret',
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [circulation_controller_1.CirculationController],
        providers: [circulation_service_1.CirculationService],
        exports: [circulation_service_1.CirculationService],
    })
], CirculationModule);
//# sourceMappingURL=circulation.module.js.map