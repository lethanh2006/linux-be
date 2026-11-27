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
| POST | `/api/learners` | Tạo học viên ẩn danh → `{ id, code, createdAt }` |
| POST | `/api/learners/restore` | Body `{ code: "XXXX-XXXX" }` → học viên có mã đó (404 nếu không có) |
| GET | `/api/progress` | Cần header `X-Learner-Id`. Trả `{ learner: { code, createdAt }, lessons: [...] }` |
| PUT | `/api/progress/:slug` | Cần header `X-Learner-Id`. Body `{ completed?, quizScore?, quizTotal? }` → tiến độ bài đó |

Học viên không cần đăng ký. Trình duyệt giữ `id` (như một khoá bí mật) và gửi qua header `X-Learner-Id`; `code` là mã ngắn để khôi phục tiến độ trên máy khác.

Bảng dữ liệu:

| Bảng | Cột chính |
|---|---|
| `learner` | `id` (uuid), `code` (duy nhất), `created_at` |
| `lesson_progress` | khoá chính `(learner_id, lesson_slug)`, `completed_at`, `quiz_score`, `quiz_total`, `updated_at` |

## Deploy

| Thành phần | Ở đâu |
|---|---|
| API | Vercel project `linux-be` → https://linux-be.vercel.app/api (push lên `master` là tự deploy) |
| Database | Neon project `linux-web` (Singapore) |

Biến môi trường trên Vercel: `DATABASE_URL` (Neon, qua pooler), `DATABASE_URL_UNPOOLED`, `NODE_ENV=production`. `vercel.json` khai báo `framework: nestjs`. Nếu thiếu dòng này, Vercel coi đây là web tĩnh và trả 404.
