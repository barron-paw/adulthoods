import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { en, type EnKeys } from './locales/en'
import { zh } from './locales/zh'

export type Locale = 'en' | 'zh'
const locales: Record<Locale, EnKeys> = { en, zh }
const STORAGE_KEY = 'adulthoods-locale'

interface I18nContextValue {
  t: EnKeys
  locale: Locale
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    return stored && (stored === 'en' || stored === 'zh') ? stored : 'en'
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ t: locales[locale], locale, setLocale }),
    [locale, setLocale]
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = `adulthoods.cc${locale === 'zh' ? ' · 成人用品' : ' · Adult Products'}`
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
