import { useState } from 'react'
import { useI18n } from '../i18n/context'
import HashQueryBox from '../components/HashQueryBox'
import ProductCard from '../components/ProductCard'
import { placeholderProducts } from '../data/products'

export default function PublicPage() {
  const { t } = useI18n()
  const [queryResult, setQueryResult] = useState<{
    courier?: string
    trackingNo?: string
    status?: string
  } | null>(null)
  const [queryLoading, setQueryLoading] = useState(false)

  const handleHashQuery = async (hash: string) => {
    setQueryLoading(true)
    setQueryResult(null)
    try {
      // TODO: call backend API to get shipping by hash
      // const res = await fetch(`/api/order?hash=${encodeURIComponent(hash)}`)
      // const data = await res.json()
      await new Promise((r) => setTimeout(r, 600))
      setQueryResult({
        courier: undefined,
        trackingNo: undefined,
        status: undefined,
      })
    } finally {
      setQueryLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top: anonymous hash query for shipping */}
      <div className="mb-10">
        <HashQueryBox
          onQuery={handleHashQuery}
          result={queryResult}
          loading={queryLoading}
        />
      </div>

      {/* Product grid (placeholder slots) */}
      <h2 className="text-xl font-semibold text-stone-200 mb-4">{t.public.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
