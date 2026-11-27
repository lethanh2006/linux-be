# Học Linux — Backend

API cho web học Linux (NestJS 12, MongoDB qua Mongoose). Frontend ở repo [linux-fe](https://github.com/lethanh2006/linux-fe).

Mọi API nằm dưới `/api`.

## Chạy ở máy mình

```bash
docker compose up -d          # MongoDB ở 127.0.0.1:27017
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

## Biến môi trường

| Biến | Ý nghĩa |
|---|---|
| `PORT` | Cổng API, mặc định 4001 |
| `MONGODB_URI` | Chuỗi kết nối MongoDB |
| `CORS_ORIGIN` | Các origin được gọi API, phân tách bằng dấu phẩy |

## API

| Phương thức | Đường dẫn | Trả về |
|---|---|---|
| GET | `/api/health` | `{ status: "ok", db: "up" \| "down" }` |
