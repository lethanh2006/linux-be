import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, type Repository } from 'typeorm';
import { Learner } from '../../database/entities/index.js';
import { generateLearnerCode } from './learner-code.js';

const UNIQUE_VIOLATION = '23505';

@Injectable()
export class LearnersService {
  constructor(@InjectRepository(Learner) private readonly learners: Repository<Learner>) {}

  /** Tạo học viên mới. Mã trùng (rất hiếm) thì sinh mã khác, thử tối đa 5 lần. */
  async create(): Promise<Learner> {
    for (let attempt = 1; ; attempt++) {
      try {
        return await this.learners.save(this.learners.create({ code: generateLearnerCode() }));
      } catch (err) {
        const duplicate = err instanceof QueryFailedError && (err.driverError as { code?: string }).code === UNIQUE_VIOLATION;
        if (!duplicate || attempt >= 5) throw err;
      }
    }
  }

  async findByCode(code: string): Promise<Learner> {
    const learner = await this.learners.findOneBy({ code });
    if (!learner) throw new NotFoundException('Không tìm thấy học viên với mã này');
    return learner;
  }

  async findById(id: string): Promise<Learner | null> {
    return this.learners.findOneBy({ id });
  }
}
