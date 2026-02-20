import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/context'
import { BNB_PAYMENT_ADDRESS } from '../config/payment'
import type { Product } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || ''

/** 产品3 定制款：起步价 500 + 可选配置及单价（USDT） */
const P3_BASE_USDT = 500
const P3_OPTIONS: { id: string; price: number }[] = [
  { id: 'stand', price: 25 }, { id: 'pubic', price: 25 }, { id: 'voice', price: 75 }, { id: 'hip', price: 100 },
  { id: 'thigh', price: 125 }, { id: 'vessel', price: 125 }, { id: 'heat', price: 125 }, { id: 'clamp', price: 125 },
  { id: 'finger', price: 200 }, { id: 'deep', price: 250 }, { id: 'nod', price: 250 }, { id: 'waist', price: 300 }, { id: 'hair', price: 500 },
]

interface ProductCardProps {
  product: Product
}

type MediaTab = 'image' | 'video'

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n()
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId)
  const [p3SelectedIds, setP3SelectedIds] = useState<string[]>([])
  const [mediaTab, setMediaTab] = useState<MediaTab>('image')
  const [videoInView, setVideoInView] = useState(false)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const hasVideo = !!product.videoUrl
  useEffect(() => {
    if (!hasVideo || mediaTab !== 'video') return
    const el = videoWrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setVideoInView(e.isIntersecting),
      { rootMargin: '100px', threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasVideo, mediaTab])
  const [hash, setHash] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [remarks, setRemarks] = useState('')
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [verifyError, setVerifyError] = useState('')
  const [copyFeedback, setCopyFeedback] = useState(false)
  const copyAddress = () => {
    navigator.clipboard.writeText(BNB_PAYMENT_ADDRESS).then(() => {
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    })
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
  const hasImages = product.images.length > 0
  // 图片加载失败时依次尝试 .jpeg / .png / .JPG，兼容服务器实际扩展名
  const baseImg = product.images[0] || ''
  const imgFallbacks = baseImg
    ? [baseImg, baseImg.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.jpeg'), baseImg.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.png'), baseImg.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.JPG')].filter(
        (u, i, a) => a.indexOf(u) === i
      )
    : []
  const [imgSrcIndex, setImgSrcIndex] = useState(0)
  const currentImgSrc = imgFallbacks[imgSrcIndex]
  const [imgError, setImgError] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [videoRetryKey, setVideoRetryKey] = useState(0)
  // 首次加载用原始 URL，避免 &_=0 导致部分 CDN/源站异常；仅重试时加 _= 做缓存规避
  const videoSrc = product.videoUrl
    ? videoRetryKey === 0
      ? product.videoUrl
      : `${product.videoUrl}${product.videoUrl.includes('?') ? '&' : '?'}_=${videoRetryKey}`
    : ''
  const handleImgError = () => {
    if (imgSrcIndex + 1 < imgFallbacks.length) {
      setImgSrcIndex((i) => i + 1)
    } else {
      setImgError(true)
    }
  }

  const handleVerify = async () => {
    const trimmedHash = hash.trim()
    if (!trimmedHash) return
    setVerifyStatus('loading')
    setVerifyError('')
    try {
      const res = await fetch(`${API_BASE}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hash: trimmedHash,
          address: address.trim(),
          phone: phone.trim(),
          remarks: remarks.trim(),
          productId: product.id,
          variantId: selectedVariant.id,
        }),
      })
      if (res.ok) {
        setVerifyStatus('ok')
      } else {
        const data = await res.json().catch(() => ({}))
        setVerifyError((data.error || res.statusText) as string)
        setVerifyStatus('error')
      }
    } catch {
      setVerifyStatus('error')
    }
  }

  return (
    <article className="rounded-xl border border-stone-700 bg-stone-900/60 overflow-hidden flex flex-col">
      <div className="aspect-square bg-stone-800 flex flex-col">
        <div className="flex border-b border-stone-700">
          <button
            type="button"
            onClick={() => setMediaTab('image')}
            className={`flex-1 py-2 text-xs font-medium ${mediaTab === 'image' ? 'bg-stone-700 text-rose-400' : 'text-stone-500 hover:text-stone-300'}`}
          >
            {t.product.images}
          </button>
          <button
            type="button"
            onClick={() => setMediaTab('video')}
            className={`flex-1 py-2 text-xs font-medium ${mediaTab === 'video' ? 'bg-stone-700 text-rose-400' : 'text-stone-500 hover:text-stone-300'}`}
          >
            {t.product.video}
          </button>
        </div>
        <div ref={videoWrapRef} className="flex-1 min-h-0 min-w-0 relative flex items-center justify-center">
          {mediaTab === 'video' ? (
            hasVideo ? (
              videoError ? (
                <div className="flex flex-col items-center gap-2 px-2">
                  <span className="text-xs text-center">{t.product.videoLoadFailed}</span>
                  <button
                    type="button"
                    onClick={() => { setVideoError(false); setVideoRetryKey((k) => k + 1) }}
                    className="text-xs px-3 py-1.5 rounded bg-stone-700 text-stone-300 hover:bg-stone-600"
                  >
                    重试
                  </button>
                </div>
              ) : (
                <video
                  key={`${product.id}-${videoSrc}`}
                  src={videoInView ? videoSrc : undefined}
                  controls
                  preload="none"
                  poster={product.images?.[0]}
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={() => setVideoError(true)}
                />
              )
            ) : (
              <span className="text-xs">{t.product.videoPlaceholder}</span>
            )
          ) : hasImages ? (
            imgError ? (
              <span className="text-xs px-2 text-center">{t.product.imageLoadFailed}</span>
            ) : (
              <img
                key={currentImgSrc}
                src={currentImgSrc}
                alt={(t.productNames as Record<string, string>)?.[product.id] ?? product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={handleImgError}
              />
            )
          ) : (
            <span className="text-xs">{t.product.imagePlaceholder}</span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        <h3 className="font-semibold text-stone-100 mb-1">{(t.productNames as Record<string, string>)?.[product.id] ?? product.name}</h3>
        {(() => {
          const descByLocale = t.productDescriptions?.[product.id as keyof typeof t.productDescriptions] as Record<string, string> | undefined
          const desc = (descByLocale?.[selectedVariant.id] && descByLocale[selectedVariant.id]) || selectedVariant.description || product.description
          return desc ? (
            <div className="text-stone-500 text-sm mb-3 overflow-y-auto max-h-24 min-h-[2.5rem]">
              <p className="whitespace-pre-line">{desc}</p>
            </div>
          ) : null
        })()}

        {product.id === 'p3' ? (
          <>
            <p className="text-stone-500 text-sm mb-1">{t.product.style}: {(t.productVariantNames as Record<string, Record<string, string>>)?.[product.id]?.v1 ?? '定制款'}</p>
            <p className="text-stone-500 text-xs mb-2">{(t.product as Record<string, string>).p3BaseLabel ?? '起步价 500 USDT'}</p>
            <div className="mb-3 space-y-1.5 max-h-32 overflow-y-auto">
              <span className="text-stone-500 text-xs">{(t.product as Record<string, string>).customOptionsLabel ?? '可选配置'}</span>
              {P3_OPTIONS.map((opt) => {
                const names = t.p3OptionNames as Record<string, string> | undefined
                const label = names?.[opt.id] ?? opt.id
                const checked = p3SelectedIds.includes(opt.id)
                return (
                  <label key={opt.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setP3SelectedIds((prev) => (prev.includes(opt.id) ? prev.filter((id) => id !== opt.id) : [...prev, opt.id]))}
                      className="rounded border-stone-600 bg-stone-800 text-rose-500"
                    />
                    <span className="text-stone-400">{label}</span>
                    <span className="text-stone-500 text-xs">+{opt.price} USDT</span>
                  </label>
                )
              })}
            </div>
            <p className="text-rose-400 font-medium mt-auto">
              {(t.product as Record<string, string>).customTotalLabel ?? '合计'}: {P3_BASE_USDT + P3_OPTIONS.filter((o) => p3SelectedIds.includes(o.id)).reduce((s, o) => s + o.price, 0)} USDT
            </p>
          </>
        ) : (
          <>
            <div className="mb-3">
              <span className="text-stone-500 text-sm mr-2">{t.product.style}: </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.variants.map((v) => {
                  const variantNames = t.productVariantNames?.[product.id as keyof typeof t.productVariantNames] as Record<string, string> | undefined
                  const displayName = (variantNames?.[v.id] && variantNames[v.id]) ? variantNames[v.id] : v.name
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        selectedVariantId === v.id
                          ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                          : 'border-stone-600 text-stone-400 hover:border-stone-500'
                      }`}
                    >
                      {displayName} · {v.price}
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="text-rose-400 font-medium mt-auto">{selectedVariant.price}</p>
          </>
        )}

        <div className="mt-4 pt-4 border-t border-stone-700 space-y-3">
          <p className="text-stone-500 text-xs mb-1">{t.product.paymentAddressLabel}</p>
          <div className="flex items-center gap-2 mb-2">
            <code className="flex-1 min-w-0 px-2 py-1.5 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs truncate">
              {BNB_PAYMENT_ADDRESS}
            </code>
            <button
              type="button"
              onClick={copyAddress}
              className="shrink-0 px-2 py-1.5 rounded bg-stone-700 text-stone-300 text-xs hover:bg-stone-600"
            >
              {copyFeedback ? t.product.paymentAddressCopied : t.product.paymentAddressCopy}
            </button>
          </div>
          <p className="text-stone-500 text-xs mb-1">{t.product.verifyTitle}</p>
          <p className="text-amber-500/90 text-xs mb-2">{(t.product as Record<string, string>).verifyAmountHint}</p>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder={t.product.verifyPlaceholder}
            className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs placeholder-stone-600"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t.product.addressPlaceholder}
            className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs placeholder-stone-600"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.product.phonePlaceholder}
            className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs placeholder-stone-600"
          />
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder={t.product.remarksPlaceholder}
            rows={2}
            className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs placeholder-stone-600 resize-none"
          />
          {verifyStatus === 'error' && verifyError && (
            <p className="text-rose-400 text-xs">{verifyError}</p>
          )}
          <button
            type="button"
            onClick={handleVerify}
            disabled={!hash.trim() || verifyStatus === 'loading'}
            className="w-full px-3 py-2 rounded bg-stone-700 text-stone-200 text-xs hover:bg-stone-600 disabled:opacity-50"
          >
            {verifyStatus === 'loading' ? '…' : verifyStatus === 'ok' ? '✓' : t.product.verify}
          </button>
        </div>
      </div>
    </article>
  )
}
