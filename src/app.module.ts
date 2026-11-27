import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { type EnvironmentVariables, validateEnv } from './config/env.validation.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        uri: config.get('MONGODB_URI', { infer: true }),
        // Mongo chưa chạy thì báo lỗi sau 5 giây thay vì treo lâu.
        serverSelectionTimeoutMS: 5000,
      }),
    }),
    HealthModule,
  ],
})
export class AppModule {}
