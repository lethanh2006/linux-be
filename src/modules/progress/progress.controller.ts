import { BadRequestException, Body, Controller, Get, Param, type PipeTransform, Put } from '@nestjs/common';
import type { Learner } from '../../database/entities/index.js';
import { CurrentLearner } from '../learners/current-learner.pipe.js';
import {
  LESSON_SLUG_PATTERN,
  type LessonProgressResponse,
  type ProgressResponse,
  UpdateProgressDto,
} from './progress.dto.js';
import { ProgressService } from './progress.service.js';

class LessonSlugPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (value.length > 80 || !LESSON_SLUG_PATTERN.test(value)) throw new BadRequestException('Tên bài không hợp lệ');
    return value;
  }
}

/** Mọi route ở đây cần header X-Learner-Id. */
@Controller('progress')
export class ProgressController {
  constructor(private readonly progress: ProgressService) {}

  @Get()
  list(@CurrentLearner() learner: Learner): Promise<ProgressResponse> {
    return this.progress.list(learner);
  }

  @Put(':slug')
  update(
    @CurrentLearner() learner: Learner,
    @Param('slug', LessonSlugPipe) slug: string,
    @Body() body: UpdateProgressDto,
  ): Promise<LessonProgressResponse> {
    return this.progress.update(learner, slug, body);
  }
}
