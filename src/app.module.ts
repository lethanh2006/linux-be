import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type EnvironmentVariables, NodeEnv, validateEnv } from './config/env.validation.js';
import { dataSourceOptions } from './database/data-source.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        ...dataSourceOptions(config.get('DATABASE_URL', { infer: true })),
        // Vercel không có bước chạy lệnh riêng nên production tự áp migration khi khởi động.
        migrationsRun: config.get('NODE_ENV', { infer: true }) === NodeEnv.Production,
        // Database chưa chạy thì báo lỗi sau 2 lần thử thay vì thử lại rất lâu.
        retryAttempts: 2,
      }),
    }),
    HealthModule,
  ],
})
export class AppModule {}
