import { Learner } from './learner.entity.js';
import { LessonProgress } from './lesson-progress.entity.js';

/** Mọi entity của app. Thêm entity mới thì thêm vào mảng này. */
export const ENTITIES: Function[] = [Learner, LessonProgress];

export { Learner, LessonProgress };
