import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.enableCors({
    origin: ['http://localhost:5001', 'https://dbl-client.vercel.app'], // allowed frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`CORS enabled for origins: http://localhost:5001, https://dbl-client.vercel.app`);
}
bootstrap();
