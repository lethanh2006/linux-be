import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

export interface HealthStatus {
  status: 'ok';
  db: 'up' | 'down';
}

/** GET /api/health: backend còn sống không, và MongoDB có trả lời không. */
@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async check(): Promise<HealthStatus> {
    try {
      await this.connection.db?.admin().ping();
      return { status: 'ok', db: this.connection.db ? 'up' : 'down' };
    } catch {
      return { status: 'ok', db: 'down' };
    }
  }
}
