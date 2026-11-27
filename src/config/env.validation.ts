import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/** Biến môi trường backend cần. Thiếu hoặc sai kiểu thì app dừng ngay lúc khởi động. */
export class EnvironmentVariables {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number = 4001;

  /** Chuỗi kết nối PostgreSQL, ví dụ postgresql://linux:123456@localhost:5434/linux_web */
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  /** Danh sách origin được phép gọi API, phân tách bằng dấu phẩy. */
  @IsString()
  @IsNotEmpty()
  CORS_ORIGIN: string = 'http://localhost:3001';
}

export function validateEnv(raw: Record<string, unknown>): EnvironmentVariables {
  const env = plainToInstance(EnvironmentVariables, raw, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const detail = errors
      .map((e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`)
      .join('\n');
    throw new Error(`Biến môi trường không hợp lệ:\n${detail}`);
  }
  return env;
}
