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
export function translate(lang, key, vars, fallback) {
  const en = STRINGS[DEFAULT_LANG]
  if (import.meta.env.DEV && fallback === undefined && !(key in en)) {
    console.warn(`[i18n] Missing English string: ${key}`)
  }

  let text = STRINGS[lang]?.[key] ?? en[key] ?? fallback ?? key
  if (vars) text = text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
  return text
}



/**
 * Returns { lang, language, setLang, t, tCategory }.
 * tCategory('Music') shows the translated name, or the English name if
 * there's no translation. Use it for labels only — URLs keep the English name.
 */
export default function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot)
  return {
    lang,
    language: LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0],
    setLang,
    t: (key, vars, fallback) => translate(lang, key, vars, fallback),
    tCategory: (name) => translate(lang, `cat.${name}`, null, name),
  }
}