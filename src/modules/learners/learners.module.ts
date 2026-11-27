import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner } from '../../database/entities/index.js';
import { CurrentLearnerPipe } from './current-learner.pipe.js';
import { LearnersController } from './learners.controller.js';
import { LearnersService } from './learners.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Learner])],
  controllers: [LearnersController],
  providers: [LearnersService, CurrentLearnerPipe],
  exports: [LearnersService, CurrentLearnerPipe],
})
export class LearnersModule {}
