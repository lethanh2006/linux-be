import { randomInt } from 'node:crypto';

/** Bỏ các ký tự dễ nhầm khi chép tay: 0/O, 1/I/L. */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** Mã học viên dạng XXXX-XXXX, ví dụ "K7QM-2HXP". */
export function generateLearnerCode(): string {
  let raw = '';
  for (let i = 0; i < 8; i++) raw += ALPHABET[randomInt(ALPHABET.length)];
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export const LEARNER_CODE_PATTERN = /^[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}$/;
