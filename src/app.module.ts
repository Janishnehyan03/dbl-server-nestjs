import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { ClassesModule } from './classes/class.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DepartmentModule } from './departments/departments.module';
import { DivisionsModule } from './divisions/divisions.module';
import { LanguagesModule } from './languages/languages.module';
import { LocationsModule } from './locations/locations.module';
import { PermissionCategoryModule } from './permission-category/permission-category.module';
import { PermissionModule } from './permission/permission.module';
import { PublishersModule } from './publishers/publishers.module';
import { QuotesModule } from './quotes/quotes.module';
import { RoleModule } from './role/role.module';
import { SectionsModule } from './sections/sections.module';
import { PatronModule } from './patron/patron.module';
import { BooksModule } from './books/books.module';
import { CirculationModule } from './circulation/circulation.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot( 
      process.env.MONGO_URI || 
      'mongodb://localhost/library', {
      connectionFactory: (connection) => {
        console.log('DB Connected');
        return connection;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigurationModule,
    QuotesModule,
    CategoriesModule,
    AuthorsModule,
    LocationsModule,
    LanguagesModule,
    SectionsModule,
    PublishersModule,
    ClassesModule,
    DepartmentModule,
    DivisionsModule,
    RoleModule,
    PermissionCategoryModule,
    PermissionModule,
    PatronModule,
    BooksModule,
    CirculationModule,
  ],
})
export class AppModule {}
