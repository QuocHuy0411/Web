// NoteList nhận 2 props từ App.jsx:
//   notes    — mảng ghi chú
//   onDelete — hàm xóa ghi chú theo id

const ICONS = ['📚', '⚡', '🔗', '🌙', '🗂️', '💡', '📌', '✏️']

export default function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={{ fontSize: 40 }}>📝</span>
        <p>Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên!</p>
      </div>
    )
  }

  return (
    <ul style={styles.list}>
      {notes.map((note, index) => (
        <NoteItem
          key={note.id}
          note={note}
          icon={ICONS[index % ICONS.length]}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

// ── NoteItem: một ghi chú đơn lẻ ────────────────────────────────────────────
function NoteItem({ note, icon, onDelete }) {
  return (
    <li style={styles.card}>
      <div style={styles.cardLeft}>
        <span style={styles.icon}>{icon}</span>
        <div>
          <p style={styles.noteText}>{note.text}</p>
          <span style={styles.date}>{note.date}</span>
        </div>
      </div>

      {/* Nút Xóa — gọi onDelete với id của ghi chú */}
      <button
        onClick={() => onDelete(note.id)}
        style={styles.deleteBtn}
      >
        Xóa
      </button>
    </li>
  )
}

const styles = {
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderRadius: 14,
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    boxShadow: 'var(--shadow-card)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    gap: 12,
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  icon: {
    fontSize: 18,
    flexShrink: 0,
    marginTop: 2,
  },
  noteText: {
    fontSize: 15,
    color: 'var(--text-primary)',
    marginBottom: 4,
    wordBreak: 'break-word',
  },
  date: {
    fontSize: 12,
    color: 'var(--text-date)',
  },
  deleteBtn: {
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 8,
    border: 'none',
    backgroundColor: 'var(--btn-del-bg)',
    color: 'var(--btn-del-text)',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background-color 0.2s',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    fontSize: 15,
  },
}
