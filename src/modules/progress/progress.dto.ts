import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export const LESSON_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class UpdateProgressDto {
  /** true: đánh dấu học xong; false: bỏ đánh dấu. Không gửi: giữ nguyên. */
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  /** Điểm câu hỏi kiểm tra; phải gửi cùng quizTotal. */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  quizScore?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  quizTotal?: number;
}

export type LessonProgressResponse = {
  slug: string;
  completedAt: string | null;
  quizScore: number | null;
  quizTotal: number | null;
};

export type ProgressResponse = {
  learner: { code: string; createdAt: string };
  lessons: LessonProgressResponse[];
};
