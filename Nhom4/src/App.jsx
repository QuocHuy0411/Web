import { useState, useEffect } from 'react'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

export default function App() {
  // ── useState: danh sách ghi chú ──────────────────────────────────────────
  // Khởi tạo từ localStorage để không mất dữ liệu khi reload
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('ghi-chu-notes')
    return saved ? JSON.parse(saved) : []
  })

  // ── useEffect: lưu notes vào localStorage mỗi khi notes thay đổi ─────────
  useEffect(() => {
    localStorage.setItem('ghi-chu-notes', JSON.stringify(notes))
  }, [notes])

  // ── Thêm ghi chú ─────────────────────────────────────────────────────────
  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),                          // id duy nhất dựa theo timestamp
      text,
      date: new Date().toLocaleString('vi-VN'), // ví dụ: "17/04/2026, 20:00"
    }
    setNotes(prev => [newNote, ...prev])        // thêm vào đầu danh sách
  }

  // ── Xóa ghi chú ──────────────────────────────────────────────────────────
  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header nhận prop noteCount để hiển thị số lượng */}
      <Header noteCount={notes.length} />

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px' }}>
        {/* NoteForm: controlled input, gọi handleAddNote khi submit */}
        <NoteForm onAdd={handleAddNote} />

        {/* NoteList: nhận notes và hàm xóa */}
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      </main>
    </div>
  )
}
