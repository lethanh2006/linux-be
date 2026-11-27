import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { type Learner, LessonProgress } from '../../database/entities/index.js';
import { applyUpdate } from './apply-update.js';
import type { LessonProgressResponse, ProgressResponse, UpdateProgressDto } from './progress.dto.js';

function toResponse(row: LessonProgress): LessonProgressResponse {
  return {
    slug: row.lessonSlug,
    completedAt: row.completedAt?.toISOString() ?? null,
    quizScore: row.quizScore,
    quizTotal: row.quizTotal,
  };
}

@Injectable()
export class ProgressService {
  constructor(@InjectRepository(LessonProgress) private readonly progress: Repository<LessonProgress>) {}

  async list(learner: Learner): Promise<ProgressResponse> {
    const rows = await this.progress.find({ where: { learnerId: learner.id }, order: { updatedAt: 'ASC' } });
    return {
      learner: { code: learner.code, createdAt: learner.createdAt.toISOString() },
      lessons: rows.map(toResponse),
    };
  }

  async update(learner: Learner, slug: string, dto: UpdateProgressDto): Promise<LessonProgressResponse> {
    const existing = await this.progress.findOneBy({ learnerId: learner.id, lessonSlug: slug });
    const state = applyUpdate(existing, dto, new Date());
    const row = existing ?? this.progress.create({ learnerId: learner.id, lessonSlug: slug });
    Object.assign(row, state);
    return toResponse(await this.progress.save(row));
  }
}
