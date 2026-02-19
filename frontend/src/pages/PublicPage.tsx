import { useState } from 'react'
import { useI18n } from '../i18n/context'
import HashQueryBox from '../components/HashQueryBox'
import ProductCard from '../components/ProductCard'
import { placeholderProducts } from '../data/products'

const API_BASE = import.meta.env.VITE_API_URL || ''

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
      const res = await fetch(`${API_BASE}/api/shipping?hash=${encodeURIComponent(hash)}`)
      if (res.ok) {
        const data = await res.json()
        setQueryResult({
          courier: data.courier,
          trackingNo: data.trackingNo,
          status: data.status,
        })
      } else {
        setQueryResult({})
      }
    } catch {
      setQueryResult({})
    } finally {
      setQueryLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-10">
        <HashQueryBox
          onQuery={handleHashQuery}
          result={queryResult}
          loading={queryLoading}
        />
      </div>
      <h2 className="text-xl font-semibold text-stone-200 mb-4">{t.public.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
