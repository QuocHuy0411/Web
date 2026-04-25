# Buổi 06 — Xây dựng Server + Form Đăng Ký Người Dùng

> **Chủ đề:** Node.js · Express · Middleware · Routing · HTML + Fetch API

---

## Cấu trúc project

```
buoi06/
├── index.js            ← Express server (backend)
├── public/
│   └── index.html      ← Giao diện HTML + Fetch API (frontend)
├── .env                ← Biến môi trường (PORT)
├── .gitignore          ← Bỏ qua node_modules và .env khi commit
├── package.json        ← Thông tin project & dependencies
└── README.md           ← Hướng dẫn này
```

---

## Yêu cầu

- **Node.js** phiên bản 16 trở lên  
  Kiểm tra: `node -v`
- **npm** (đi kèm Node.js)  
  Kiểm tra: `npm -v`

---

## Hướng dẫn cài đặt & chạy

### Bước 1 — Mở thư mục project trong VS Code

```bash
cd buoi06
code .
```

### Bước 2 — Cài dependencies

```bash
npm install
```

> Lệnh này sẽ tải `express` và `dotenv` vào thư mục `node_modules/`.

### Bước 3 — Chạy server

**Cách 1 — Chạy thông thường (dùng `node`):**
```bash
npm start
# hoặc
node index.js
```

**Cách 2 — Chạy với auto-reload (dùng `nodemon`, khuyến khích khi dev):**
```bash
npm run dev
```

> `nodemon` tự động restart server mỗi khi bạn lưu file.

### Bước 4 — Mở trình duyệt

Truy cập: **http://localhost:3000**

---

## Các API Endpoint

### `GET /api/info`

Trả thông tin người dùng kèm lời chào.

| Query Param | Kiểu   | Bắt buộc | Mô tả           |
|-------------|--------|----------|-----------------|
| `name`      | string | ✅        | Tên người dùng  |
| `age`       | number | ✅        | Tuổi (≥ 18)    |

**Ví dụ request:**
```
GET http://localhost:3000/api/info?name=An&age=20
```

**Response thành công (200):**
```json
{
  "success": true,
  "name": "An",
  "age": 20,
  "message": "Xin chào An! Bạn 20 tuổi — đủ điều kiện."
}
```

**Response lỗi — tuổi < 18 (400):**
```json
{
  "success": false,
  "message": "Tuổi không hợp lệ: phải từ 18 trở lên (nhận được: 15)."
}
```

---

### `POST /api/register`

Đăng ký người dùng mới.

**Body (JSON):**
```json
{
  "name": "Nguyễn Văn An",
  "age": 22,
  "email": "an@example.com"
}
```

**Response thành công (201):**
```json
{
  "success": true,
  "message": "Đăng ký thành công! Chào mừng Nguyễn Văn An 🎉",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn An",
    "age": 22,
    "email": "an@example.com",
    "registeredAt": "25/04/2025, 10:30:00"
  }
}
```

---

## Middleware

| Tên         | Vị trí     | Chức năng                                              |
|-------------|------------|--------------------------------------------------------|
| `logger`    | Global     | Ghi `[time] METHOD /path` ra console cho mọi request  |
| `checkAge`  | Route-level | Kiểm tra `age ≥ 18`, trả 400 nếu không hợp lệ        |

> **Lưu ý:** Middleware phải được khai báo **trước** các route trong Express.

---

## Ví dụ console khi server chạy

```
🚀 Server đang chạy tại http://localhost:3000
📁 Serving static files từ thư mục: public/
─────────────────────────────────────────────
[10:25:01] GET /
[10:25:10] GET /api/info
[10:25:35] POST /api/register
```

---

## Các lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| `Cannot find module 'express'` | Chưa cài dependencies | Chạy `npm install` |
| `EADDRINUSE: address already in use :::3000` | Port 3000 đang bận | Đổi PORT trong `.env` hoặc tắt tiến trình cũ |
| Fetch lỗi "Failed to fetch" | Server chưa chạy | Chạy `npm start` trước |
| `nodemon: command not found` | Thiếu devDependency | Chạy `npm install` lại |
