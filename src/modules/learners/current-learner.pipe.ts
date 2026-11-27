import {
  BadRequestException,
  createParamDecorator,
  type ExecutionContext,
  Injectable,
  NotFoundException,
  type PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import type { Learner } from '../../database/entities/index.js';
import { LearnersService } from './learners.service.js';

/** Đổi giá trị header X-Learner-Id thành học viên (404 nếu không có). */
@Injectable()
export class CurrentLearnerPipe implements PipeTransform<string | undefined, Promise<Learner>> {
  constructor(private readonly learners: LearnersService) {}

  async transform(id: string | undefined): Promise<Learner> {
    if (!id || !isUUID(id)) throw new BadRequestException('Thiếu hoặc sai header X-Learner-Id');
    const learner = await this.learners.findById(id);
    if (!learner) throw new NotFoundException('Không tìm thấy học viên');
    return learner;
  }
}

/**
 * Lấy học viên từ header X-Learner-Id.
 * Dùng: `@CurrentLearner() learner: Learner` (pipe CurrentLearnerPipe tra học viên trong database).
 */
export const CurrentLearner = () => LearnerIdHeader(CurrentLearnerPipe);

const LearnerIdHeader = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const value = ctx.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined> }>().headers['x-learner-id'];
  return Array.isArray(value) ? value[0] : value;
});
