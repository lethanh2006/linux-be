import type { Connection } from 'mongoose';
import { HealthController } from './health.controller.js';

function fakeConnection(ping: () => Promise<unknown>): Connection {
  return { db: { admin: () => ({ ping }) } } as unknown as Connection;
}

describe('HealthController', () => {
  it('báo db up khi MongoDB trả lời ping', async () => {
    const controller = new HealthController(fakeConnection(() => Promise.resolve({ ok: 1 })));
    await expect(controller.check()).resolves.toEqual({ status: 'ok', db: 'up' });
  });

  it('báo db down khi ping lỗi', async () => {
    const controller = new HealthController(
      fakeConnection(() => Promise.reject(new Error('mất kết nối'))),
    );
    await expect(controller.check()).resolves.toEqual({ status: 'ok', db: 'down' });
  });

  it('báo db down khi chưa có kết nối', async () => {
    const controller = new HealthController({ db: undefined } as unknown as Connection);
    await expect(controller.check()).resolves.toEqual({ status: 'ok', db: 'down' });
  });
});
