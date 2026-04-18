import { useTheme } from '../context/ThemeContext'

// Header nhận prop noteCount từ App.jsx (truyền xuống qua props)
export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme() // lấy theme từ Context

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <span style={styles.logo}>📋</span>
        <h1 style={styles.title}>Ghi Chú Cá Nhân</h1>
      </div>

      <div style={styles.right}>
        {/* Hiển thị số ghi chú — dữ liệu đến từ props */}
        <span style={styles.badge}>{noteCount} ghi chú</span>

        {/* Nút toggle theme — gọi Context */}
        <button
          onClick={toggleTheme}
          style={styles.themeBtn}
          title={theme === 'light' ? 'Chuyển Dark mode' : 'Chuyển Light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 60,
    backgroundColor: 'var(--bg-header)',
    borderBottom: '1px solid var(--border-card)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    transition: 'background-color 0.3s ease',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    fontSize: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    padding: '4px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    backgroundColor: 'var(--badge-bg)',
    color: 'var(--badge-text)',
    border: '1px solid var(--border-card)',
  },
  themeBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: '1px solid var(--border-card)',
    backgroundColor: 'var(--theme-btn-bg)',
    cursor: 'pointer',
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
}
