import type { DataSource } from 'typeorm';
import { HealthController } from './health.controller.js';

function fakeDataSource(query: () => Promise<unknown>): DataSource {
  return { query } as unknown as DataSource;
}

describe('HealthController', () => {
  it('báo db up khi PostgreSQL trả lời', async () => {
    const controller = new HealthController(fakeDataSource(() => Promise.resolve([{ '?column?': 1 }])));
    await expect(controller.check()).resolves.toEqual({ status: 'ok', db: 'up' });
  });

  it('báo db down khi truy vấn lỗi', async () => {
    const controller = new HealthController(
      fakeDataSource(() => Promise.reject(new Error('mất kết nối'))),
    );
    await expect(controller.check()).resolves.toEqual({ status: 'ok', db: 'down' });
  });
});
