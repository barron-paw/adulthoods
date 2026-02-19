import type { Product } from '../types'

export const placeholderProducts: Product[] = [
  {
    id: 'p1',
    name: 'Product A',
    description: 'Product description placeholder.',
    images: [],
    videoUrl: undefined,
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
    images: [],
    videoUrl: undefined,
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
    images: [],
    videoUrl: undefined,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Style 1', price: '0.00 USDT' },
      { id: 'v2', name: 'Style 2', price: '0.00 USDT' },
    ],
  },
]
