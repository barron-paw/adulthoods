import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/context'

const ADMIN_TOKEN_KEY = 'adulthoods-admin-token'

interface OrderRow {
  hash: string
  courier: string
  trackingNo: string
}

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function AdminPage() {
  const { t } = useI18n()
  const [token, setToken] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_KEY) : null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [orders, setOrders] = useState<OrderRow[]>([
    { hash: '', courier: '', trackingNo: '' },
  ])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wecomWebhook, setWecomWebhook] = useState('')
  const [wecomSaveLoading, setWecomSaveLoading] = useState(false)
  const [wecomSaved, setWecomSaved] = useState(false)

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken(null)
    setPassword('')
    setLoginError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoginLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setLoginError(data.error || t.admin.loginError)
        return
      }
      if (data.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
        setToken(data.token)
        setPassword('')
      } else {
        setLoginError(t.admin.loginError)
      }
    } catch {
      setLoginError(t.admin.loginError)
    } finally {
      setLoginLoading(false)
    }
  }

  const addRow = () => {
    setOrders((prev) => [...prev, { hash: '', courier: '', trackingNo: '' }])
  }

  const updateRow = (index: number, field: keyof OrderRow, value: string) => {
    setOrders((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const removeRow = (index: number) => {
    if (orders.length <= 1) return
    setOrders((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (!token) return
    let cancelled = false
    fetch(`${API_BASE}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.wecomWebhook != null) setWecomWebhook(data.wecomWebhook || '')
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [token])

  const handleWecomSave = async () => {
    if (!token) return
    setWecomSaveLoading(true)
    setWecomSaved(false)
    try {
      const res = await fetch(`${API_BASE}/api/admin/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wecomWebhook: wecomWebhook.trim() }),
      })
      if (res.status === 401) logout()
      if (res.ok) {
        setWecomSaved(true)
        setTimeout(() => setWecomSaved(false), 2000)
      }
    } finally {
      setWecomSaveLoading(false)
    }
  }

  const handleSave = async () => {
    setError(null)
    const rows = orders.filter((r) => r.hash.trim())
    if (rows.length === 0) {
      setError('Please fill at least one hash.')
      return
    }
    if (!token) {
      setError('Not logged in.')
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/shipping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orders: rows }),
      })
      if (res.status === 401) {
        logout()
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) throw new Error(await res.text())
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    }
  }

  if (token === null) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16">
        <h1 className="text-xl font-semibold text-amber-400 mb-4">{t.admin.loginTitle}</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.admin.passwordPlaceholder}
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          {loginError && (
            <p className="text-rose-400 text-sm">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full px-4 py-3 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-500 disabled:opacity-50"
          >
            {loginLoading ? '…' : t.admin.loginButton}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-amber-400 mb-2">{t.admin.title}</h1>
          <p className="text-stone-500 text-sm">{t.admin.desc}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="px-3 py-1.5 rounded-lg border border-stone-600 text-stone-400 text-sm hover:bg-stone-800"
        >
          {t.admin.logout}
        </button>
      </div>

      {error && (
        <p className="mb-4 p-3 rounded bg-rose-900/30 border border-rose-700 text-rose-300 text-sm">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-stone-700 bg-stone-900/60 overflow-hidden">
        <div className="p-4 border-b border-stone-700 flex items-center justify-between">
          <span className="text-stone-400 text-sm">Hash → {t.admin.tableCourier} / {t.admin.tableTracking}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addRow}
              className="px-3 py-1.5 rounded-lg bg-stone-700 text-stone-300 text-sm hover:bg-stone-600"
            >
              {t.admin.addRow}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-amber-600 text-white text-sm hover:bg-amber-500"
            >
              {saved ? t.admin.saved : t.admin.save}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-700 text-stone-500 text-left">
                <th className="p-3 font-medium">{t.admin.tableHash}</th>
                <th className="p-3 font-medium">{t.admin.tableCourier}</th>
                <th className="p-3 font-medium">{t.admin.tableTracking}</th>
                <th className="p-3 w-20">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row, index) => (
                <tr key={index} className="border-b border-stone-800 hover:bg-stone-800/50">
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.hash}
                      onChange={(e) => updateRow(index, 'hash', e.target.value)}
                      placeholder={t.admin.hashPlaceholder}
                      className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.courier}
                      onChange={(e) => updateRow(index, 'courier', e.target.value)}
                      placeholder={t.admin.courierPlaceholder}
                      className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.trackingNo}
                      onChange={(e) => updateRow(index, 'trackingNo', e.target.value)}
                      placeholder={t.admin.trackingPlaceholder}
                      className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      disabled={orders.length <= 1}
                      className="text-rose-400 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t.admin.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-stone-500 text-xs">{t.admin.note}</p>

      <div className="mt-8 rounded-xl border border-stone-700 bg-stone-900/60 overflow-hidden">
        <div className="p-4 border-b border-stone-700">
          <span className="text-stone-400 text-sm">{t.admin.wecomTitle}</span>
        </div>
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={wecomWebhook}
            onChange={(e) => setWecomWebhook(e.target.value)}
            placeholder={t.admin.wecomPlaceholder}
            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          <button
            type="button"
            onClick={handleWecomSave}
            disabled={wecomSaveLoading}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm hover:bg-amber-500 disabled:opacity-50 whitespace-nowrap"
          >
            {wecomSaveLoading ? '…' : wecomSaved ? t.admin.wecomSaved : t.admin.wecomSave}
          </button>
        </div>
      </div>
    </div>
  )
}
