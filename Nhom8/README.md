# Bài Tập: Chi Tiết Triển Khai & Rằng Buộc Dữ Liệu

## Tổng Quan Dự Án

Đây là một ứng dụng **Next.js** hiện đại với form đăng ký tiêu chuẩn, áp dụng các yêu cầu:

- ✅ **Xác thực dữ liệu Client-side**: Sử dụng **Zod** + **React Hook Form**
- ✅ **Xác thực Server-side**: Double validation với Server Actions
- ✅ **Uncontrolled Components**: Chuyển đổi từ `useState` sang `react-hook-form`
- ✅ **Real-time Validation**: Kiểm tra lỗi ngay khi blur input
- ✅ **Server Actions**: Xử lý form trên server với `'use server'`

---

## Cấu Trúc Dự Án

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles (Tailwind)
├── components/
│   └── RegisterForm.tsx     # Form component (uncontrolled)
├── actions/
│   └── register.ts          # Server actions (use server)
└── lib/
    └── schema.ts            # Zod validation schema
```

---

## Các Tính Năng Chính

### 1️⃣ **Validation Schema (Zod)**
- **File**: `src/lib/schema.ts`
- Email validation
- Mật khẩu mạnh (8+ ký tự, 1 chữ hoa, 1 chữ số)
- Xác nhận mật khẩu trùng khớp
- Điều khoản & Điều kiện (bắt buộc)
- 9 trường dữ liệu tổng cộng

### 2️⃣ **Server Actions**
- **File**: `src/actions/register.ts`
- Validation lại toàn bộ dữ liệu trên server
- Return kết quả `{ success, message, errors }`
- Xử lý lỗi an toàn
- Simulated API delay

### 3️⃣ **Uncontrolled Form Component**
- **File**: `src/components/RegisterForm.tsx`
- Sử dụng `react-hook-form` (uncontrolled)
- Integrasi Zod validator qua `@hookform/resolvers`
- Real-time validation khi blur (`mode: 'onBlur'`)
- Hiển thị lỗi ngay lập tức
- Loading state khi submit
- Success/Error messages

### 4️⃣ **Styling**
- Tailwind CSS
- Responsive design
- Focus states & hover effects
- Color-coded error/success messages

---

## Cách Chạy

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Mở `http://localhost:3000` trong browser

### Build & Start
```bash
npm run build
npm start
```

---

## Chi Tiết Validation

### Email
- Phải đúng format email

### Password
- Tối thiểu 8 ký tự
- Ít nhất 1 chữ hoa (A-Z)
- Ít nhất 1 chữ số (0-9)

### Phone
- Đúng 10 chữ số

### Confirm Password
- Phải trùng khớp với password

### Agreed to Terms
- Phải checked (true)

---

## Kiến Trúc: Client ↔ Server

```
┌─────────────────────────────────┐
│   Browser / Client Side         │
├─────────────────────────────────┤
│ 1. User enters data             │
│ 2. React Hook Form + Zod        │
│    validates (real-time)        │
│ 3. Show errors or enable submit │
└──────────────┬──────────────────┘
               │ [Submit]
               ↓
┌─────────────────────────────────┐
│   Server (Next.js)              │
├─────────────────────────────────┤
│ 1. Receive form data            │
│ 2. Zod safeParse() - double     │
│    validation                   │
│ 3. Return { success, message }  │
└──────────────┬──────────────────┘
               │ [Response]
               ↓
┌─────────────────────────────────┐
│   Browser - Show Result         │
├─────────────────────────────────┤
│ Success ✓ → Clear form          │
│ Error ✗ → Show message          │
└─────────────────────────────────┘
```

---

## Technologies

- **Framework**: Next.js 14
- **Form Handling**: React Hook Form 7.75.0
- **Validation**: Zod 4.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Language**: TypeScript 5
- **Runtime**: React 18

---

## Các Yêu Cầu Đã Hoàn Thành ✅

| Yêu Cầu | Trạng Thái |
|---------|-----------|
| Register form với useForm hook | ✅ |
| Zod schema validation | ✅ |
| Client-side validation (real-time) | ✅ |
| Server-side validation | ✅ |
| Server Actions ('use server') | ✅ |
| Uncontrolled components | ✅ |
| Error handling | ✅ |
| Responsive UI | ✅ |
| 10 input states | ✅ |

---

## Author
Nhóm 8

## License
MIT
