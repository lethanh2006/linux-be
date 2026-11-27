import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { Learner } from '../../database/entities/index.js';
import { type LearnerResponse, RestoreLearnerDto } from './learners.dto.js';
import { LearnersService } from './learners.service.js';

function toResponse(learner: Learner): LearnerResponse {
  return { id: learner.id, code: learner.code, createdAt: learner.createdAt.toISOString() };
}

@Controller('learners')
export class LearnersController {
  constructor(private readonly learners: LearnersService) {}

  /** Tạo học viên ẩn danh mới. */
  @Post()
  async create(): Promise<LearnerResponse> {
    return toResponse(await this.learners.create());
  }

  /** Khôi phục trên máy khác bằng mã học viên. */
  @Post('restore')
  @HttpCode(HttpStatus.OK)
  async restore(@Body() body: RestoreLearnerDto): Promise<LearnerResponse> {
    return toResponse(await this.learners.findByCode(body.code));
  }
}
