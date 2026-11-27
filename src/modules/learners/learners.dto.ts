import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { LEARNER_CODE_PATTERN } from './learner-code.js';

export class RestoreLearnerDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value))
  @IsString()
  @Matches(LEARNER_CODE_PATTERN, { message: 'Mã học viên có dạng XXXX-XXXX' })
  code!: string;
}

/** Thông tin trả về cho trình duyệt: id là khoá bí mật, chỉ trả cho chính học viên. */
export type LearnerResponse = { id: string; code: string; createdAt: string };
