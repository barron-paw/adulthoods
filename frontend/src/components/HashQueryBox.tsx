import { useState } from 'react'
import { useI18n } from '../i18n/context'

interface HashQueryBoxProps {
  onQuery?: (hash: string) => void
  result?: { courier?: string; trackingNo?: string; status?: string } | null
  loading?: boolean
}

export default function HashQueryBox({ onQuery, result, loading }: HashQueryBoxProps) {
  const { t } = useI18n()
  const [hash, setHash] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = hash.trim()
    if (trimmed) onQuery?.(trimmed)
  }

  return (
    <section className="rounded-xl border border-stone-700 bg-stone-900/60 p-6">
      <h2 className="text-lg font-semibold text-rose-400 mb-3">{t.public.hashQueryTitle}</h2>
      <p className="text-stone-500 text-sm mb-4">{t.public.hashQueryDesc}</p>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder={t.public.hashQueryPlaceholder}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium disabled:opacity-50"
        >
          {loading ? t.public.querying : t.public.query}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 rounded-lg bg-stone-800 border border-stone-600">
          <div className="grid gap-2 text-sm">
            {result.courier && <p><span className="text-stone-500">{t.public.result.courier}: </span>{result.courier}</p>}
            {result.trackingNo && <p><span className="text-stone-500">{t.public.result.trackingNo}: </span>{result.trackingNo}</p>}
            {result.status && <p><span className="text-stone-500">{t.public.result.status}: </span>{result.status}</p>}
            {!result.courier && !result.trackingNo && !result.status && (
              <p className="text-stone-500">{t.public.result.noData}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
