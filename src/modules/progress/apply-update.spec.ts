import { BadRequestException } from '@nestjs/common';
import { applyUpdate } from './apply-update.js';

const now = new Date('2026-11-27T10:00:00Z');
const earlier = new Date('2026-11-20T08:00:00Z');

describe('applyUpdate', () => {
  it('đánh dấu học xong lần đầu thì lưu thời điểm hiện tại', () => {
    expect(applyUpdate(null, { completed: true }, now)).toEqual({ completedAt: now, quizScore: null, quizTotal: null });
  });

  it('đánh dấu lại không đổi thời điểm học xong lần đầu', () => {
    const current = { completedAt: earlier, quizScore: null, quizTotal: null };
    expect(applyUpdate(current, { completed: true }, now).completedAt).toBe(earlier);
  });

  it('bỏ đánh dấu thì xoá thời điểm, giữ điểm', () => {
    const current = { completedAt: earlier, quizScore: 4, quizTotal: 5 };
    expect(applyUpdate(current, { completed: false }, now)).toEqual({ completedAt: null, quizScore: 4, quizTotal: 5 });
  });

  it('lưu điểm mà không đổi trạng thái học xong', () => {
    const current = { completedAt: earlier, quizScore: 2, quizTotal: 5 };
    expect(applyUpdate(current, { quizScore: 5, quizTotal: 5 }, now)).toEqual({ completedAt: earlier, quizScore: 5, quizTotal: 5 });
  });

  it('từ chối điểm thiếu tổng hoặc lớn hơn tổng', () => {
    expect(() => applyUpdate(null, { quizScore: 3 }, now)).toThrow(BadRequestException);
    expect(() => applyUpdate(null, { quizScore: 6, quizTotal: 5 }, now)).toThrow(BadRequestException);
  });
});
