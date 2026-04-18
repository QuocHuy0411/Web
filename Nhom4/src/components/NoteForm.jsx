import { useState } from 'react'

// NoteForm: controlled input — toàn bộ giá trị input được quản lý bởi useState
export default function NoteForm({ onAdd }) {
  const [text, setText] = useState('') // controlled state cho ô input

  const handleSubmit = () => {
    if (text.trim() === '') return   // không cho thêm ghi chú rỗng
    onAdd(text.trim())               // gọi hàm thêm từ App.jsx
    setText('')                      // reset input về rỗng
  }

  // Nhấn Enter cũng thêm ghi chú
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        value={text}                               // controlled: value gắn với state
        onChange={(e) => setText(e.target.value)}  // cập nhật state khi gõ
        onKeyDown={handleKeyDown}
        placeholder="Nhập ghi chú mới..."
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        + Thêm
      </button>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: 15,
    borderRadius: 12,
    border: '1.5px solid var(--border-input)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s, background-color 0.3s',
  },
  button: {
    padding: '12px 24px',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    border: 'none',
    backgroundColor: 'var(--btn-add-bg)',
    color: '#ffffff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s',
  },
}
