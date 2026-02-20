export interface ProductVariant {
  id: string
  name: string
  price: string
  priceWei?: string
  /** 该款式的详细描述，点击款式时自动切换显示 */
  description?: string
}

export interface Product {
  id: string
  name: string
  description?: string
  images: string[]
  videoUrl?: string
  variants: ProductVariant[]
  defaultVariantId: string
}

export interface OrderByHash {
  hash: string
  courier?: string
  trackingNo?: string
  status?: 'pending' | 'shipped' | 'delivered'
  updatedAt?: string
}
