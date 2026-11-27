import { generateLearnerCode, LEARNER_CODE_PATTERN } from './learner-code.js';

describe('generateLearnerCode', () => {
  it('sinh mã dạng XXXX-XXXX, không có ký tự dễ nhầm', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateLearnerCode();
      expect(code).toMatch(LEARNER_CODE_PATTERN);
      expect(code).not.toMatch(/[01OIL]/);
    }
  });
});
