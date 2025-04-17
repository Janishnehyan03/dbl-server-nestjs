import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { Configuration, ConfigurationSchema } from './configuration.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Configuration.name, schema: ConfigurationSchema }])],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService], // Export if used elsewhere
})
export class ConfigurationModule {}