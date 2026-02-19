import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { en, type EnKeys } from './locales/en'
import { zh } from './locales/zh'
import { ja } from './locales/ja'
import { ko } from './locales/ko'
import { es } from './locales/es'

export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'es'
const locales: Record<Locale, EnKeys> = { en, zh, ja, ko, es }
const STORAGE_KEY = 'adulthoods-locale'
const VALID_LOCALES: Locale[] = ['en', 'zh', 'ja', 'ko', 'es']

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
    return stored && VALID_LOCALES.includes(stored) ? stored : 'en'
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
    const langMap: Record<Locale, string> = { en: 'en', zh: 'zh-CN', ja: 'ja', ko: 'ko', es: 'es' }
    const titleSuffix: Record<Locale, string> = {
      en: ' · Adult Products',
      zh: ' · 成人用品',
      ja: ' · アダルト',
      ko: ' · 성인용품',
      es: ' · Productos',
    }
    document.documentElement.lang = langMap[locale]
    document.title = `adulthoods.cc${titleSuffix[locale]}`
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
