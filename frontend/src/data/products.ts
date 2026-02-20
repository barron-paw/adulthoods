import type { Product } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL || 'https://api.adulthood.me').replace(/\/$/, '')
const API_GOODS = `${API_BASE}/adulthoodgoods`
// 设为 true 时：图片用同源 /goods/（放 frontend/public/goods/），视频仍用 api
const USE_PUBLIC_IMAGES = import.meta.env.VITE_GOODS_FROM_PUBLIC === 'true'
const IMAGE_BASE = USE_PUBLIC_IMAGES ? '/goods' : API_GOODS
const VIDEO_BASE = API_GOODS

// 产品1→图1 视2，产品2→图3 视4，… 产品6→图11 视12。视频 URL 加 ?v= 避免浏览器/CDN 把不同文件当同一缓存。点击款式时描述自动切换为对应 variant.description
export const placeholderProducts: Product[] = [
  {
    id: 'p1',
    name: '产品1',
    description: '此功能有口交功能，多了个智能对话，支持阴交 肛交 乳交 手交 足交 口交+纯手工植发+阴道一体式设计+皮肤厚度28MM+智能阴道震动娇喘+真人智能语音发声88种对话内容+医用级精细纳米软硅胶+处女膜设计（不出血哟）+1:1真人打造165CM身高+12斤左右体重+真人实感硅胶胸+充电3小时即可对话7-8小时+质保3年+腿部收纳折叠后为30-50cm',
    images: [`${IMAGE_BASE}/1.jpeg`],
    videoUrl: `${VIDEO_BASE}/2.MP4?v=2`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: '标准款', price: '299 USDT', description: '此功能有口交功能，多了个智能对话，支持阴交 肛交 乳交 手交 足交 口交+纯手工植发+阴道一体式设计+皮肤厚度28MM+智能阴道震动娇喘+真人智能语音发声88种对话内容+医用级精细纳米软硅胶+处女膜设计（不出血哟）+1:1真人打造165CM身高+12斤左右体重+真人实感硅胶胸+充电3小时即可对话7-8小时+质保3年+腿部收纳折叠后为30-50cm' },
      { id: 'v2', name: '延伸版', price: '399 USDT', description: '便携可拆分头部+此功能有口交功能，有发声器发声功能，支持阴交 肛交 乳交 足交 口交+仿真人套发+阴道一体式设计+内置金属骨架+可私人订制智能语音和私处植毛+通道恒温37.5°C+医用级精细纳米软硅胶+1:1真人打造蜡像S妆容+真人仿真果冻胸+可随意调节四肢+产品终身保修+装箱收纳1米' },
    ],
  },
  {
    id: 'p2',
    name: '产品2',
    description: '重约60斤，身高153cm，全实体，无须充气。支持阴交 肛交 乳交 手交 足交 口交+仿真人头发+真人倒模阴道一体式设计+真人一比一果冻胸+真人一比一永久精致妆容（永不变形）+通道加热恒温37.5°C+站立功能+内置金属骨架48个关节（姿势任摆）+一比一果冻臀部+真人倒模双子宫通道+可私人定制智能阴道震动夹吸和私处植毛',
    images: [`${IMAGE_BASE}/3.JPG`],
    videoUrl: `${VIDEO_BASE}/4.MP4?v=4`,
    defaultVariantId: 'v1',
    variants: [
      { id: 'v1', name: '普通版', price: '799 USDT', description: '重约60斤，身高153cm，全实体，无须充气。支持阴交 肛交 乳交 手交 足交 口交+仿真人头发+真人倒模阴道一体式设计+真人一比一果冻胸+真人一比一永久精致妆容（永不变形）+通道加热恒温37.5°C+站立功能+内置金属骨架48个关节（姿势任摆）+一比一果冻臀部+真人倒模双子宫通道+可私人定制智能阴道震动夹吸和私处植毛' },
      { id: 'v2', name: '高级版', price: '999 USDT', description: '重约68斤，身高163cm，全实体，无须充气。支持阴交 肛交 乳交 手交 足交 口交+仿真人头发+真人倒模阴道一体式设计+真人一比一果冻胸+站立功能+真人一比一永久精致妆容（永不变形）+通道加热恒温37.5°C+内置金属骨架56个关节（2026年新款骨架，可体验日本女优般任意姿势体位）+一比一果冻臀部+自润滑自高潮（无需添加润滑剂，越插越滑，持续快感体验）+真人倒模双子宫通道' },
    ],
  },
  {
    id: 'p3',
    name: '产品3',
    description: '娃娃功能定制：可选配站立、植阴毛、智能语音、震动抖臀、大腿拆分、经络血管、全身加温、下体夹吸、手指骨、深喉口交、点头口交、扭腰、植发等，每项价格见下方描述（原价÷4 以 USDT 计）。',
    images: [`${IMAGE_BASE}/5.jpg`],
    videoUrl: `${VIDEO_BASE}/6.MP4?v=6`,
    defaultVariantId: 'v1',
    variants: [{ id: 'v1', name: '定制款', price: '按需报价', description: '' }],
  },
  { id: 'p4', name: '产品4', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/7.jpg`], videoUrl: `${VIDEO_BASE}/8.MP4?v=8`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
  { id: 'p5', name: '产品5', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/9.png`], videoUrl: `${VIDEO_BASE}/10.MP4?v=10`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
  { id: 'p6', name: '产品6', description: 'Product description placeholder.', images: [`${IMAGE_BASE}/11.jpg`], videoUrl: `${VIDEO_BASE}/12.MP4?v=12`, defaultVariantId: 'v1', variants: [{ id: 'v1', name: 'Variant A', price: '0.01 BNB' }, { id: 'v2', name: 'Variant B', price: '0.01 BNB' }] },
]
