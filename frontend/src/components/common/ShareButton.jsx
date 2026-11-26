import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { SocialIcon } from './SocialIcon'
import useLanguage from '../../hooks/useLanguage'
import { eventUrl, shareLine, shareTargets, copyText } from '../../utils/share'

const TONES = {
  overlay: 'bg-white/90 text-navy shadow-lg backdrop-blur hover:bg-white',
  plain:
    'border border-navy/15 text-navy hover:bg-navy/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10',
}

const canNativeShare = () =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function'

/**
 * Share an EVENT (never a ticket — a ticket's QR is its entry pass).
 * Phones: the phone's own share sheet. Laptops: copy link + app links.
 * Same tone/size props as SaveButton, so the two sit side by side.
 */
export function ShareButton({ event, tone = 'plain', size = 'h-11 w-11', className = '' }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapRef = useRef(null)

  const url = eventUrl(event)
  const text = shareLine(event)
  const targets = shareTargets({ url, text, title: event.title })

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // "Link copied" resets after a moment.
  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const nativeShare = async () => {
    try {
      await navigator.share({ title: event.title, text, url })
      setOpen(false)
      return true
    } catch (err) {
      // Closing the share sheet isn't an error worth reacting to.
      return err?.name === 'AbortError'
    }
  }

  const onTrigger = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = window.matchMedia?.('(pointer: coarse)').matches
    if (touch && canNativeShare() && (await nativeShare())) return
    setOpen((o) => !o)
  }

  const copy = async () => {
    if (await copyText(url)) setCopied(true)
  }

  const item =
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition hover:bg-mist dark:hover:bg-white/10'

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={onTrigger}
        aria-label={t('share.label', null, 'Share this event')}
        title={t('share.label', null, 'Share this event')}
        aria-expanded={open}
        aria-haspopup="true"
        className={`grid ${size} place-items-center rounded-full transition ${TONES[tone] ?? TONES.plain}`}
      >
        <Icon n="share" className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('share.label', null, 'Share this event')}
          className="animate-pop absolute right-0 top-full z-40 mt-2 w-64 origin-top-right rounded-2xl border border-navy/10 bg-white p-2 text-navy shadow-2xl shadow-navy/15 dark:border-white/10 dark:bg-navy-2 dark:text-white dark:shadow-black/40"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-mortar dark:text-white/50">
            {t('share.title', null, 'Share this event')}
          </p>

          <button type="button" onClick={copy} className={item}>
            <span
              className={`grid h-8 w-8 place-items-center rounded-full transition ${
                copied ? 'bg-navy text-white dark:bg-white dark:text-navy' : 'bg-mist dark:bg-white/10'
              }`}
            >
              <Icon n={copied ? 'check' : 'copy'} className="h-4 w-4" />
            </span>
            {copied ? t('share.copied', null, 'Link copied') : t('share.copy', null, 'Copy link')}
          </button>

          <hr className="my-1.5 border-navy/10 dark:border-white/10" />

          <ul>
            {targets.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={item}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-mist dark:bg-white/10">
                    {s.social ? <SocialIcon name={s.social} /> : <Icon n={s.icon} className="h-4 w-4" />}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {canNativeShare() && (
            <>
              <hr className="my-1.5 border-navy/10 dark:border-white/10" />
              <button type="button" onClick={nativeShare} className={item}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-mist dark:bg-white/10">
                  <Icon n="share" className="h-4 w-4" />
                </span>
                {t('share.more', null, 'More options…')}
              </button>
            </>
          )}

          <p className="sr-only" aria-live="polite">
            {copied ? t('share.copied', null, 'Link copied') : ''}
          </p>
        </div>
      )}
    </div>
  )
}