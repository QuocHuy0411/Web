import Image from 'next/image'
import styles from './page.module.css'

// ✅ Bước 2: Hàm fetch lấy dữ liệu từ API DummyJSON
async function fetchRandomShirt() {
  const res = await fetch('https://dummyjson.com/products/category/mens-shirts', {
    cache: 'no-store', // Không cache → mỗi lần F5 sẽ gọi lại API
  })

  if (!res.ok) {
    throw new Error('Không thể lấy dữ liệu từ API')
  }

  const data = await res.json()
  const products = data.products

  // ✅ Bước 3: Dùng Math.random() để chọn ngẫu nhiên 1 sản phẩm
  const randomIndex = Math.floor(Math.random() * products.length)
  return products[randomIndex]
}

export default async function Home() {
  const product = await fetchRandomShirt()

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>Fashion Trending 2026</h2>
        </div>

        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={250}
            height={250}
            className={styles.productImage}
            priority
          />
        </div>

        {/* Product Info */}
        <div className={styles.cardBody}>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>New Arrival</span>
            <span className={styles.price}>${product.price}</span>
          </div>
          <p className={styles.productName}>{product.title}</p>
          <p className={styles.productDesc}>{product.description}</p>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className={styles.ratingText}>({product.rating})</span>
          </div>

          <button className={styles.addBtn}>Thêm vào giỏ hàng</button>
        </div>
      </div>

      <p className={styles.hint}>💡 Nhấn <kbd>F5</kbd> để xem sản phẩm ngẫu nhiên khác</p>
    </main>
  )
}
