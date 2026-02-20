import type { Product } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL || 'https://api.adulthood.me').replace(/\/$/, '')
const API_GOODS = `${API_BASE}/adulthoodgoods`
// 设为 true 时：图片用同源 /goods/（放 frontend/public/goods/），视频仍用 api
const USE_PUBLIC_IMAGES = import.meta.env.VITE_GOODS_FROM_PUBLIC === 'true'
const IMAGE_BASE = USE_PUBLIC_IMAGES ? '/goods' : API_GOODS
const VIDEO_BASE = API_GOODS

// 产品1→图1 视2，产品2→图3 视4，… 产品6→图11 视12。视频 URL 加 ?v= 避免浏览器/CDN 把不同文件当同一缓存
export const placeholderProducts: Product[] = [
  { id: 'p1', name: '产品1', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/1.jpeg`], videoUrl: `${VIDEO_BASE}/2.MP4?v=2`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Standard', price: '0.01 BNB' }, { id: 'v2', name: 'Large', price: '0.01 BNB' }] },
  { id: 'p2', name: '产品2', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/3.JPG`], videoUrl: `${VIDEO_BASE}/4.MP4?v=4`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Single', price: '0.01 BNB' }, { id: 'v2', name: 'Set', price: '0.01 BNB' }] },
  { id: 'p3', name: '产品3', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/5.jpg`], videoUrl: `${VIDEO_BASE}/6.MP4?v=6`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Style 1', price: '0.01 BNB' }, { id: 'v2', name: 'Style 2', price: '0.01 BNB' }] },
  { id: 'p4', name: '产品4', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/7.jpg`], videoUrl: `${VIDEO_BASE}/8.MP4?v=8`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
  { id: 'p5', name: '产品5', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/9.png`], videoUrl: `${VIDEO_BASE}/10.MP4?v=10`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
  { id: 'p6', name: '产品6', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/11.jpg`], videoUrl: `${VIDEO_BASE}/12.MP4?v=12`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
]
