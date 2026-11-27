import type { DataSourceOptions } from 'typeorm';
import { ENTITIES } from './entities/index.js';
import { MIGRATIONS } from './migrations/index.js';

/**
 * Cấu hình TypeORM dùng chung cho app và cho CLI migration.
 * Entity và migration khai báo bằng mảng import thẳng (không dùng glob) vì Vercel đóng gói code,
 * đường dẫn file lúc chạy không còn giống trong src/.
 */
export function dataSourceOptions(url: string): DataSourceOptions {
  return {
    type: 'postgres',
    url,
    entities: ENTITIES,
    migrations: MIGRATIONS,
    // Không tự sửa bảng theo entity; đổi cấu trúc bảng phải qua migration.
    synchronize: false,
    // uuid sinh bằng gen_random_uuid() có sẵn từ PostgreSQL 13, không cần cài extension.
    uuidExtension: 'pgcrypto',
    installExtensions: false,
  };
}
