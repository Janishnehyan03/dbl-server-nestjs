import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { CirculationModule } from './circulation/circulation.module';
import { ClassesModule } from './classes/class.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DepartmentModule } from './departments/departments.module';
import { DivisionsModule } from './divisions/divisions.module';
import { LanguagesModule } from './languages/languages.module';
import { LibrarySettingsModule } from './library-settings/library-settings.module';
import { LocationsModule } from './locations/locations.module';
import { PatronModule } from './patron/patron.module';
import { PermissionCategoryModule } from './permission-category/permission-category.module';
import { PermissionModule } from './permission/permission.module';
import { PublishersModule } from './publishers/publishers.module';
import { QuotesModule } from './quotes/quotes.module';
import { RoleModule } from './role/role.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/library',
      {
        connectionFactory: (connection) => {
          console.log('DB Connected');
          return connection;
        },
      },
    ),
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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { algorithm: 'HS256' },
    }),
    LibrarySettingsModule,
    
  ],
  controllers: [AppController],
})
export class AppModule {}
