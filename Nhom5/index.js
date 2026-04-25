require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARE: Parse JSON body ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── MIDDLEWARE 1: Logger ───────────────────────────────────────────────────
// Ghi [time] METHOD /path ra console cho mỗi request
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('vi-VN');
  console.log(`[${time}] ${req.method} ${req.path}`);
  next();
});

// ─── MIDDLEWARE 2: checkAge ─────────────────────────────────────────────────
// Nếu age < 18 hoặc không có → trả 400 + message lỗi
// Ngược lại → gọi next()
const checkAge = (req, res, next) => {
  // Lấy age từ query (GET) hoặc body (POST)
  const age = req.query.age !== undefined ? req.query.age : req.body.age;

  if (age === undefined || age === null || age === '') {
    return res.status(400).json({
      success: false,
      message: 'Thiếu thông tin tuổi (age).',
    });
  }

  const ageNum = Number(age);

  if (isNaN(ageNum) || ageNum < 18) {
    return res.status(400).json({
      success: false,
      message: `Tuổi không hợp lệ: phải từ 18 trở lên (nhận được: ${age}).`,
    });
  }

  next();
};

// ─── STATIC: Serve public folder ────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── AUTO-INCREMENT ID cho /api/register ────────────────────────────────────
let nextId = 1;

// ─── ROUTE 1: GET /api/info ──────────────────────────────────────────────────
// Gắn middleware checkAge riêng cho route này
// Trả JSON: name, age, lời chào mừng
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;

  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Thiếu thông tin tên (name).',
    });
  }

  return res.status(200).json({
    success: true,
    name: name.trim(),
    age: Number(age),
    message: `Xin chào ${name.trim()}! Bạn ${age} tuổi — đủ điều kiện.`,
  });
});

// ─── ROUTE 2: POST /api/register ────────────────────────────────────────────
// Validate không bỏ trống, trả lại thông tin + id tự tăng
app.post('/api/register', (req, res) => {
  const { name, age, email } = req.body;

  // Validate không bỏ trống
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Tên không được để trống.' });
  }
  if (age === undefined || age === null || age === '') {
    return res.status(400).json({ success: false, message: 'Tuổi không được để trống.' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).json({ success: false, message: 'Email không được để trống.' });
  }

  // Validate age >= 18
  const ageNum = Number(age);
  if (isNaN(ageNum) || ageNum < 18) {
    return res.status(400).json({
      success: false,
      message: `Tuổi phải từ 18 trở lên (nhận được: ${age}).`,
    });
  }

  // Validate email format đơn giản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Email không đúng định dạng.' });
  }

  const newUser = {
    id: nextId++,
    name: name.trim(),
    age: ageNum,
    email: email.trim(),
    registeredAt: new Date().toLocaleString('vi-VN'),
  };

  return res.status(201).json({
    success: true,
    message: `Đăng ký thành công! Chào mừng ${newUser.name} 🎉`,
    user: newUser,
  });
});

// ─── START SERVER ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📁 Serving static files từ thư mục: public/`);
  console.log(`─`.repeat(45));
});
