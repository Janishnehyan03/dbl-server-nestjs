"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const authors_module_1 = require("./authors/authors.module");
const categories_module_1 = require("./categories/categories.module");
const class_module_1 = require("./classes/class.module");
const configuration_module_1 = require("./configuration/configuration.module");
const departments_module_1 = require("./departments/departments.module");
const divisions_module_1 = require("./divisions/divisions.module");
const languages_module_1 = require("./languages/languages.module");
const locations_module_1 = require("./locations/locations.module");
const permission_category_module_1 = require("./permission-category/permission-category.module");
const permission_module_1 = require("./permission/permission.module");
const publishers_module_1 = require("./publishers/publishers.module");
const quotes_module_1 = require("./quotes/quotes.module");
const role_module_1 = require("./role/role.module");
const sections_module_1 = require("./sections/sections.module");
const patron_module_1 = require("./patron/patron.module");
const books_module_1 = require("./books/books.module");
const circulation_module_1 = require("./circulation/circulation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI ||
                'mongodb://localhost/library', {
                connectionFactory: (connection) => {
                    console.log('DB Connected');
                    return connection;
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            configuration_module_1.ConfigurationModule,
            quotes_module_1.QuotesModule,
            categories_module_1.CategoriesModule,
            authors_module_1.AuthorsModule,
            locations_module_1.LocationsModule,
            languages_module_1.LanguagesModule,
            sections_module_1.SectionsModule,
            publishers_module_1.PublishersModule,
            class_module_1.ClassesModule,
            departments_module_1.DepartmentModule,
            divisions_module_1.DivisionsModule,
            role_module_1.RoleModule,
            permission_category_module_1.PermissionCategoryModule,
            permission_module_1.PermissionModule,
            patron_module_1.PatronModule,
            books_module_1.BooksModule,
            circulation_module_1.CirculationModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map