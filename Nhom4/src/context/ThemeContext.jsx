import { createContext, useContext, useState, useEffect } from 'react'

// 1. Tạo Context
const ThemeContext = createContext()

// 2. Provider — bao bọc toàn bộ app
export function ThemeProvider({ children }) {
  // Đọc theme đã lưu từ localStorage (nếu có), mặc định là 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('ghi-chu-theme') || 'light'
  )

  // useEffect: mỗi khi theme thay đổi → cập nhật class trên <body> và lưu vào localStorage
  useEffect(() => {
    document.body.className = theme   // 'light' hoặc 'dark'
    localStorage.setItem('ghi-chu-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Custom hook — dùng trong các component con
export function useTheme() {
  return useContext(ThemeContext)
}
