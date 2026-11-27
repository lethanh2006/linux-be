import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import type { EnvironmentVariables } from './config/env.validation.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvironmentVariables, true>);

  // Mọi API nằm dưới /api, khớp với proxy /api/* của Next.js.
  app.setGlobalPrefix('api');
  app.use(helmet());
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

  await app.listen(config.get('PORT', { infer: true }));
}
await bootstrap();
