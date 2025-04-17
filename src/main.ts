import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.enableCors({
    origin: ['http://localhost:5001', 'https://dbl-client.vercel.app'], // Make sure this matches your frontend
    methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // ✅ Required for sending cookies/auth headers
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
