import { useSyncExternalStore } from 'react'
import { LANGUAGES, DEFAULT_LANG } from '../i18n/languages'
import { STRINGS } from '../i18n/strings'

const KEY = 'billevents-lang'
const listeners = new Set()
const known = (code) => LANGUAGES.some((l) => l.code === code)

function read() {
  try {
    const saved = localStorage.getItem(KEY)
    return known(saved) ? saved : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

let state = read()

// Keeps <html lang> correct so screen readers pronounce the page properly.
const apply = () => {
  document.documentElement.lang = state
}
apply()

const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const getSnapshot = () => state

export function setLang(code) {
  if (!known(code) || code === state) return
  state = code
  try {
    localStorage.setItem(KEY, code)
  } catch {
    /* storage unavailable */
  }
  apply()
  listeners.forEach((l) => l())
}

/**
 * Looks up a string: chosen language → English → the key itself.
 * `{name}`-style placeholders are filled from `vars`.
 */
export function translate(lang, key, vars) {
  const en = STRINGS[DEFAULT_LANG]
  if (import.meta.env.DEV && !(key in en)) console.warn(`[i18n] Missing English string: ${key}`)

  let text = STRINGS[lang]?.[key] ?? en[key] ?? key
  if (vars) text = text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
  return text
}

/** Returns { lang, language, setLang, t }. */
export default function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot)
  return {
    lang,
    language: LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0],
    setLang,
    t: (key, vars) => translate(lang, key, vars),
  }
}