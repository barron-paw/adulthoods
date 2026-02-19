export interface ProductVariant {
  id: string
  name: string
  price: string
  priceWei?: string
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
