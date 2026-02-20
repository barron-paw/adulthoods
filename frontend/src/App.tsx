import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useI18n } from './i18n/context'
import type { Locale } from './i18n/context'
import PublicPage from './pages/PublicPage'

const AdminPage = lazy(() => import('./pages/AdminPage'))

function App() {
  const { t, locale, setLocale } = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-rose-400">{t.siteName}</Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-stone-400 hover:text-stone-200">{t.nav.home}</Link>
            <Link to="/admin" className="text-stone-500 hover:text-amber-400">{t.nav.admin}</Link>
            <div className="flex gap-1 border-l border-stone-700 pl-4">
              {(['en', 'zh', 'ja', 'ko', 'es', 'ar'] as Locale[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  className={`px-2 py-1 rounded text-sm ${locale === l ? 'bg-stone-700 text-rose-400' : 'text-stone-500 hover:text-stone-300'}`}
                >
                  {t.lang[l]}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-stone-500">…</div>}>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="border-t border-stone-800 py-4 text-center text-stone-500 text-sm">
        {t.siteName} · {t.footer.tagline}
      </footer>
    </div>
  )
}

export default App
