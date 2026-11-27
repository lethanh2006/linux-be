import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonProgress } from '../../database/entities/index.js';
import { LearnersModule } from '../learners/learners.module.js';
import { ProgressController } from './progress.controller.js';
import { ProgressService } from './progress.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([LessonProgress]), LearnersModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
