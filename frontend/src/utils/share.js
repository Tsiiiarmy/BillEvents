/** Public link to an event page. */
export const eventUrl = (event) => `${window.location.origin}/events/${event.id}`

/** One-line description that travels with the link. */
export const shareLine = (event) =>
  [event.title, event.date, [event.venue, event.city].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' · ')

/** Share links for each app. Telegram first: it's the big one in Ethiopia. */
export function shareTargets({ url, text, title }) {
  const u = encodeURIComponent(url)
  const tx = encodeURIComponent(text)
  return [
    { id: 'telegram', label: 'Telegram', icon: 'send', href: `https://t.me/share/url?url=${u}&text=${tx}` },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'phone', href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}` },
    { id: 'facebook', label: 'Facebook', social: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { id: 'x', label: 'X', social: 'x', href: `https://twitter.com/intent/tweet?text=${tx}&url=${u}` },
    {
      id: 'email',
      label: 'Email',
      icon: 'mail',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    },
  ]
}

/** Copies text. Falls back to the old trick on browsers without the Clipboard API. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}