import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import type { Learner } from './learner.entity.js';

/** Tiến độ một bài của một học viên. Khoá chính ghép (learner_id, lesson_slug). */
@Entity('lesson_progress')
@Check('lesson_progress_quiz_check', 'quiz_score IS NULL OR (quiz_total > 0 AND quiz_score BETWEEN 0 AND quiz_total)')
export class LessonProgress {
  @PrimaryColumn({ name: 'learner_id', type: 'uuid' })
  learnerId!: string;

  @PrimaryColumn({ name: 'lesson_slug', type: 'text' })
  lessonSlug!: string;

  /** null: chưa đánh dấu học xong. */
  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt!: Date | null;

  /** Điểm lần làm câu hỏi kiểm tra gần nhất. */
  @Column({ name: 'quiz_score', type: 'smallint', nullable: true })
  quizScore!: number | null;

  @Column({ name: 'quiz_total', type: 'smallint', nullable: true })
  quizTotal!: number | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne('Learner', (learner: Learner) => learner.progress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'learner_id' })
  learner!: Learner;
}
