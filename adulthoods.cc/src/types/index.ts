// 商品款式：不同款式不同价格
export interface ProductVariant {
  id: string
  name: string       // 如 "标准版" "大号"
  price: string      // 显示价格，如 "0.00 BNB"
  priceWei?: string  // 链上支付用
}

// 商品：预留视频、图片、款式
export interface Product {
  id: string
  name: string
  description?: string
  // 预留：图片（多图）
  images: string[]
  // 预留：视频
  videoUrl?: string
  variants: ProductVariant[]
  // 默认选中的款式 id
  defaultVariantId: string
}

// 订单/支付：BNB 链 hash
export interface OrderByHash {
  hash: string
  courier?: string   // 快递公司
  trackingNo?: string // 快递单号
  status?: 'pending' | 'shipped' | 'delivered'
  updatedAt?: string
}
