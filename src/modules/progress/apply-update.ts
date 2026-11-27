import { BadRequestException } from '@nestjs/common';
import type { UpdateProgressDto } from './progress.dto.js';

export type ProgressState = {
  completedAt: Date | null;
  quizScore: number | null;
  quizTotal: number | null;
};

/**
 * Tính trạng thái mới của một bài từ trạng thái cũ và dữ liệu gửi lên.
 * - completed=true giữ nguyên thời điểm học xong lần đầu; completed=false xoá.
 * - quizScore và quizTotal phải đi cùng nhau, điểm không vượt tổng.
 */
export function applyUpdate(current: ProgressState | null, dto: UpdateProgressDto, now: Date): ProgressState {
  const next: ProgressState = current
    ? { ...current }
    : { completedAt: null, quizScore: null, quizTotal: null };

  if (dto.completed !== undefined) {
    next.completedAt = dto.completed ? (next.completedAt ?? now) : null;
  }

  const hasScore = dto.quizScore !== undefined;
  const hasTotal = dto.quizTotal !== undefined;
  if (hasScore !== hasTotal) throw new BadRequestException('quizScore và quizTotal phải gửi cùng nhau');
  if (hasScore && hasTotal) {
    if (dto.quizScore! > dto.quizTotal!) throw new BadRequestException('quizScore không được lớn hơn quizTotal');
    next.quizScore = dto.quizScore!;
    next.quizTotal = dto.quizTotal!;
  }

  return next;
}
