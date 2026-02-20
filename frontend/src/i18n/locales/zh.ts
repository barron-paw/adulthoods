import type { EnKeys } from './en'

export const zh = {
  siteName: 'adulthood.me',
  nav: { home: '首页', admin: '管理后台' },
  footer: { tagline: '支付验证与查询' },
  public: {
    title: '商品',
    hashQueryTitle: '订单 / 物流查询',
    hashQueryDesc: '匿名用户请输入支付时的 USDT 交易 Hash 查询快递状态。',
    hashQueryPlaceholder: '请输入交易 Hash (0x...)',
    query: '查询',
    querying: '查询中…',
    result: {
      courier: '快递公司',
      trackingNo: '快递单号',
      status: '状态',
      noData: '该 Hash 暂无快递信息，请稍后再查或联系客服。',
    },
  },
  product: {
    style: '款式',
    paymentAddressLabel: 'BNB 链收款地址',
    paymentAddressCopy: '复制',
    paymentAddressCopied: '已复制',
    verifyTitle: '支付验证（USDT 交易 Hash）',
    verifyPlaceholder: '支付后填入 Hash 验证',
    verify: '验证',
    images: '图片',
    video: '视频',
    imagePlaceholder: '[图片/视频占位]',
    videoPlaceholder: '[视频占位]',
    imageLoadFailed: '图片加载失败',
    videoLoadFailed: '视频加载失败',
    address: '地址',
    addressPlaceholder: '收货地址',
    phone: '电话',
    phonePlaceholder: '手机/电话',
    remarks: '备注',
    remarksPlaceholder: '配送备注（选填）',
  },
  admin: {
    title: '管理后台',
    desc: '为每个支付 Hash 填写快递公司与单号，匿名用户可在首页通过 Hash 查询物流状态。',
    loginTitle: '管理后台登录',
    passwordPlaceholder: '密码',
    loginButton: '登录',
    loginError: '密码错误。',
    logout: '退出',
    tableHash: '支付 Hash',
    tableCourier: '快递公司',
    tableTracking: '快递单号',
    actions: '操作',
    addRow: '新增一行',
    save: '保存',
    saved: '已保存',
    delete: '删除',
    hashPlaceholder: '0x...',
    courierPlaceholder: '如：顺丰、中通',
    trackingPlaceholder: '快递单号',
    note: '后端需提供：根据 hash 查询快递信息的接口；接受本页提交的 hash + 快递公司 + 单号的保存接口。',
    wecomTitle: '企业微信机器人',
    wecomPlaceholder: 'Webhook 地址（如 https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...）',
    wecomSave: '保存',
    wecomSaved: '已保存',
  },
  lang: { en: 'English', zh: '中文', ja: '日本語', ko: '한국어', es: 'Español' },
  productNames: { p1: '充气娃娃1', p2: '充气娃娃2', p3: '充气娃娃3', p4: '充气娃娃4', p5: '充气娃娃5', p6: '充气娃娃6' },
  productVariantNames: {
    p1: { v1: '标准款', v2: '延伸版' },
    p2: { v1: '普通版', v2: '高级版' },
    p3: { v1: '定制款', v2: '' },
    p4: { v1: '款式A', v2: '款式B' },
    p5: { v1: '款式A', v2: '款式B' },
    p6: { v1: '款式A', v2: '款式B' },
  },
  productDescriptions: {
    p1: {
      v1: '此功能有口交功能，多了个智能对话，支持阴交 肛交 乳交 手交 足交 口交+纯手工植发+阴道一体式设计+皮肤厚度28MM+智能阴道震动娇喘+真人智能语音发声88种对话内容+医用级精细纳米软硅胶+处女膜设计（不出血哟）+1:1真人打造165CM身高+12斤左右体重+真人实感硅胶胸+充电3小时即可对话7-8小时+质保3年+腿部收纳折叠后为30-50cm',
      v2: '便携可拆分头部+此功能有口交功能，有发声器发声功能，支持阴交 肛交 乳交 足交 口交+仿真人套发+阴道一体式设计+内置金属骨架+可私人订制智能语音和私处植毛+通道恒温37.5°C+医用级精细纳米软硅胶+1:1真人打造蜡像S妆容+真人仿真果冻胸+可随意调节四肢+产品终身保修+装箱收纳1米',
    },
    p2: {
      v1: '重约60斤，身高153cm，全实体，无须充气。支持阴交 肛交 乳交 手交 足交 口交+仿真人头发+真人倒模阴道一体式设计+真人一比一果冻胸+真人一比一永久精致妆容（永不变形）+通道加热恒温37.5°C+站立功能+内置金属骨架48个关节（姿势任摆）+一比一果冻臀部+真人倒模双子宫通道+可私人定制智能阴道震动夹吸和私处植毛',
      v2: '重约68斤，身高163cm，全实体，无须充气。支持阴交 肛交 乳交 手交 足交 口交+仿真人头发+真人倒模阴道一体式设计+真人一比一果冻胸+站立功能+真人一比一永久精致妆容（永不变形）+通道加热恒温37.5°C+内置金属骨架56个关节（2026年新款骨架，可体验日本女优般任意姿势体位）+一比一果冻臀部+自润滑自高潮（无需添加润滑剂，越插越滑，持续快感体验）+真人倒模双子宫通道',
    },
    p3: {
      v1: `娃娃功能定制（以下为单项加价，单位 USDT）：

站立 · 25 USDT
主要是通过脚底部设置三颗立钉实现站立，如果介意慎重选配。

植阴毛 · 25 USDT
模拟真人下体阴毛，手工植毛。

智能语音 · 75 USDT
触摸敏感地就能发音并且随着你的幅度不同发音的效果不同，支持对话。

震动抖臀 · 100 USDT
通过内置两颗高功率马达达到震颤效果。

大腿拆分 · 125 USDT
如果存储空间有限，或者要外带的话，还是不错选择。

经络血管 · 125 USDT
血管经络还原，让细节更加真实，有效提高了视觉体验。

全身加温 · 125 USDT
加温效果较为一般，目前市面上都算差不多，可以买个电热毯。

下体夹吸 · 125 USDT
通道内部夹击以及吸吮体验，在配置感应发音。

手指骨 · 200 USDT
手指关节是合金骨架材质，弯曲手指比较有关节骨感，可以弯曲摆弄手势（握拳等）和拿轻物品，更加仿真接近真人设计。

深喉口交 · 250 USDT
面部细节真实，嘴巴内有通道，口腔内有牙齿舌头细节，且下巴可以活动。

点头口交 · 250 USDT
模仿真人口爱，享受极致体验。

扭腰 · 300 USDT
模拟真实人体腰部扭动功能。注意：158cm 以上的可以做。

植发 · 500 USDT
手工植入头发、眉毛和眼睫毛，更美丽动人。`,
      v2: '',
    },
    p4: { v1: '', v2: '' },
    p5: { v1: '', v2: '' },
    p6: { v1: '', v2: '' },
  },
} as unknown as EnKeys
