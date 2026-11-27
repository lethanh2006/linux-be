import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { LessonProgress } from './lesson-progress.entity.js';

/**
 * Học viên ẩn danh. Trình duyệt giữ `id` (như một khoá bí mật) để đọc/ghi tiến độ;
 * `code` là mã ngắn dễ chép, dùng để khôi phục tiến độ trên máy khác.
 */
@Entity('learner')
export class Learner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  code!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany('LessonProgress', (progress: LessonProgress) => progress.learner)
  progress!: LessonProgress[];
}
