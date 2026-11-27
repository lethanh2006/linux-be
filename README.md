# Học Linux — Backend

API cho web học Linux (NestJS 12, PostgreSQL qua TypeORM). Frontend ở repo [linux-fe](https://github.com/lethanh2006/linux-fe).

Mọi API nằm dưới `/api`.

## Chạy ở máy mình

```bash
docker compose up -d          # PostgreSQL ở 127.0.0.1:5434 (tài khoản linux / 123456)
cp .env.example .env
pnpm install
pnpm dev                      # http://localhost:4001/api
curl -s http://localhost:4001/api/health
# {"status":"ok","db":"up"}
```

## Lệnh

| Lệnh | Làm gì |
|---|---|
| `pnpm dev` | Chạy và tự khởi động lại khi sửa code |
| `pnpm build` | Build ra thư mục `dist/` |
| `pnpm start:prod` | Chạy bản đã build |
| `pnpm test` | Chạy test (Vitest) |
| `pnpm lint` | Kiểm tra code (oxlint) |
| `pnpm migration:generate src/database/migrations/<Ten>` | Sinh migration từ thay đổi entity, rồi thêm class vào `src/database/migrations/index.ts` |
| `pnpm migration:run` | Áp các migration chưa chạy |
| `pnpm migration:show` | Xem migration nào đã chạy |

## Biến môi trường

| Biến | Ý nghĩa |
|---|---|
| `PORT` | Cổng API, mặc định 4001 |
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL |
| `DATABASE_URL_UNPOOLED` | (Neon) kết nối trực tiếp, chỉ CLI migration dùng; không có thì dùng `DATABASE_URL` |
| `CORS_ORIGIN` | Các origin được gọi API, phân tách bằng dấu phẩy |

Production (`NODE_ENV=production`) tự áp migration khi khởi động.

## API

| Phương thức | Đường dẫn | Trả về |
|---|---|---|
| GET | `/api/health` | `{ status: "ok", db: "up" \| "down" }` |
