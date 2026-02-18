import { useState } from 'react'
import { useI18n } from '../i18n/context'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n()
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId)
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]

  return (
    <article className="rounded-xl border border-stone-700 bg-stone-900/60 overflow-hidden flex flex-col">
      <div className="aspect-square bg-stone-800 flex items-center justify-center text-stone-500 text-sm">
        {product.videoUrl ? (
          <div className="w-full h-full flex items-center justify-center bg-black/40">
            <span className="text-xs">{t.product.videoPlaceholder}</span>
          </div>
        ) : product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span>{t.product.imagePlaceholder}</span>
        )}
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

        <div className="mt-4 pt-4 border-t border-stone-700">
          <p className="text-stone-500 text-xs mb-2">{t.product.verifyTitle}</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.product.verifyPlaceholder}
              readOnly
              className="flex-1 px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-400 text-xs placeholder-stone-600"
            />
            <button
              type="button"
              className="px-3 py-2 rounded bg-stone-700 text-stone-400 text-xs hover:bg-stone-600"
            >
              {t.product.verify}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
