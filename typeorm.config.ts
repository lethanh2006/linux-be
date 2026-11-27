/**
 * DataSource cho TypeORM CLI (migration:run, migration:generate…), xem scripts trong package.json.
 * Ưu tiên DATABASE_URL_UNPOOLED (Neon) vì migration cần kết nối trực tiếp, không qua pooler.
 */
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/database/data-source.js';

config({ quiet: true });
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '';

export default new DataSource(dataSourceOptions(url));
