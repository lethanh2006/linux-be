import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import type { EnvironmentVariables } from './config/env.validation.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvironmentVariables, true>);

  // Mọi API nằm dưới /api, khớp với proxy /api/* của Next.js.
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: config
      .get('CORS_ORIGIN', { infer: true })
      .split(',')
      .map((origin) => origin.trim()),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.enableShutdownHooks();

  // PORT lấy từ biến môi trường (Vercel tự cấp), ở máy mình mặc định 4001.
  await app.listen(config.get('PORT', { infer: true }));
}
// Không dùng await ở cấp ngoài cùng: bộ build của Vercel có thể biên dịch ra CommonJS.
void bootstrap();
