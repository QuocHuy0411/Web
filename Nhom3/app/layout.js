import './globals.css'

export const metadata = {
  title: 'Fashion Trending 2026',
  description: 'Random men shirt picker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="mdl-js">
      <body>{children}</body>
    </html>
  )
}
