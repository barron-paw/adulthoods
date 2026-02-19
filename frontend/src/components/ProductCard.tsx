import { useState } from 'react'
import { useI18n } from '../i18n/context'
import type { Product } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || ''

interface ProductCardProps {
  product: Product
}

type MediaTab = 'image' | 'video'

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n()
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId)
  const [mediaTab, setMediaTab] = useState<MediaTab>('image')
  const [hash, setHash] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [remarks, setRemarks] = useState('')
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
  const hasImages = product.images.length > 0
  const hasVideo = !!product.videoUrl

  const handleVerify = async () => {
    const trimmedHash = hash.trim()
    if (!trimmedHash) return
    setVerifyStatus('loading')
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
        <div className="flex-1 flex items-center justify-center text-stone-500 text-sm min-h-0">
          {mediaTab === 'video' ? (
            hasVideo ? (
              <video src={product.videoUrl} controls className="max-w-full max-h-full object-contain" />
            ) : (
              <span className="text-xs">{t.product.videoPlaceholder}</span>
            )
          ) : hasImages ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs">{t.product.imagePlaceholder}</span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-stone-100 mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-stone-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        )}

        <div className="mb-3">
          <span className="text-stone-500 text-sm mr-2">{t.product.style}: </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.variants.map((v) => (
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
                {v.name} · {v.price}
              </button>
            ))}
          </div>
        </div>

        <p className="text-rose-400 font-medium mt-auto">{selectedVariant.price}</p>

        <div className="mt-4 pt-4 border-t border-stone-700 space-y-3">
          <p className="text-stone-500 text-xs mb-2">{t.product.verifyTitle}</p>
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
