import type { Product } from '../types'

const GOODS_BASE = 'https://api.adulthood.me/adulthoodgoods/123456'

export const placeholderProducts: Product[] = [
  {
    id: 'p1',
    name: 'Product A',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/1.jpg`],
    videoUrl: `${GOODS_BASE}/2.mp4`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Standard', price: '0.00 USDT' },
      { id: 'v2', name: 'Large', price: '0.00 USDT' },
    ],
  },
  {
    id: 'p2',
    name: 'Product B',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/3.jpg`],
    videoUrl: `${GOODS_BASE}/4.mp4`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Single', price: '0.00 USDT' },
      { id: 'v2', name: 'Set', price: '0.00 USDT' },
    ],
  },
  {
    id: 'p3',
    name: 'Product C',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/5.jpg`],
    videoUrl: `${GOODS_BASE}/6.mp4`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Style 1', price: '0.00 USDT' },
      { id: 'v2', name: 'Style 2', price: '0.00 USDT' },
    ],
  },
]
