import { useEffect, useRef, useState } from 'react'

import { Icon } from '../common/Icon'
import useLanguage from '../../hooks/useLanguage'
import { LANGUAGES } from '../../i18n/languages'

/** Navbar language dropdown. Arrow keys move, Enter picks, Escape closes. */
export function LanguageMenu() {
  const { lang, language, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)
  const items = useRef([])

  useEffect(() => {
    if (!open) return undefined

    // Put focus on the current language when the menu opens.
    const i = LANGUAGES.findIndex((l) => l.code === lang)
    items.current[Math.max(0, i)]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, lang])

  const onItemKey = (e, i) => {
    const n = LANGUAGES.length
    const go = (j) => {
      e.preventDefault()
      items.current[(j + n) % n]?.focus()
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(n - 1)
    else if (e.key === 'Tab') setOpen(false)
  }

  const choose = (code) => {
    setLang(code)
    setOpen(false)
    btn.current?.focus()
  }

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${language.native}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-bold transition hover:bg-navy/5 focus-visible:ring-4 focus-visible:ring-aqua/40 dark:hover:bg-white/10"
      >
        <Icon n="globe" className="h-4 w-4" />
        <span lang={language.code}>{language.short}</span>
        <Icon
          n="chevron"
          className={`h-3.5 w-3.5 opacity-60 transition motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t('nav.language')}
          className="animate-up absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-navy/10 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-navy-2"
        >
          {LANGUAGES.map((l, i) => {
            const on = l.code === lang
            return (
              <button
                key={l.code}
                ref={(el) => {
                  items.current[i] = el
                }}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                tabIndex={-1}
                onClick={() => choose(l.code)}
                onKeyDown={(e) => onItemKey(e, i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-mist focus-visible:bg-mist focus-visible:outline-none dark:hover:bg-white/10 dark:focus-visible:bg-white/10 ${
                  on ? 'font-bold' : ''
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span lang={l.code} className="block text-sm">
                    {l.native}
                  </span>
                  {l.native !== l.name && (
                    <span className="block text-xs font-normal text-mortar dark:text-white/55">
                      {l.name}
                    </span>
                  )}
                </span>
                {on && <Icon n="check" className="h-4 w-4 shrink-0 text-teal dark:text-aqua" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}