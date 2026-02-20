import type { Product } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL || 'https://api.adulthood.me').replace(/\/$/, '')
const GOODS_BASE = `${API_BASE}/adulthoodgoods`
// 换视频/图片后改大这个版本号，避免浏览器和 CDN 继续用旧缓存
const MEDIA_CACHE_V = '?v=2'

// 顺序：产品1(1,2) 产品2(3,4) 产品3(5,6) 产品4(7,8) 产品5(9,10) 产品6(11,12)。原产品1的图/视已改为9、10→显示在产品5。
export const placeholderProducts: Product[] = [
  {
    id: 'p1',
    name: '产品1',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/1.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/2.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Standard', price: '0.01 BNB' },
      { id: 'v2', name: 'Large', price: '0.01 BNB' },
    ],
  },
  {
    id: 'p2',
    name: '产品2',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/3.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/4.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Single', price: '0.01 BNB' },
      { id: 'v2', name: 'Set', price: '0.01 BNB' },
    ],
  },
  {
    id: 'p3',
    name: '产品3',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/5.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/6.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Style 1', price: '0.01 BNB' },
      { id: 'v2', name: 'Style 2', price: '0.01 BNB' },
    ],
  },
  {
    id: 'p4',
    name: '产品4',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/7.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/8.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Variant A', price: '0.01 BNB' },
      { id: 'v2', name: 'Variant B', price: '0.01 BNB' },
    ],
  },
  {
    id: 'p5',
    name: '产品5',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/9.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/10.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Variant A', price: '0.01 BNB' },
      { id: 'v2', name: 'Variant B', price: '0.01 BNB' },
    ],
  },
  {
    id: 'p6',
    name: '产品6',
    description: 'Product description placeholder.',
    images: [`${GOODS_BASE}/11.jpg${MEDIA_CACHE_V}`],
    videoUrl: `${GOODS_BASE}/12.MP4${MEDIA_CACHE_V}`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: 'Variant A', price: '0.01 BNB' },
      { id: 'v2', name: 'Variant B', price: '0.01 BNB' },
    ],
  },
]
