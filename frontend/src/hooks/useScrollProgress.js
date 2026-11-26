import { useEffect, useState } from 'react'

export default function useScrollProgress(ref, { start = 0.8, end = 0.6 } = {}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const distance = r.height + vh * (start - end)
      const next = Math.min(1, Math.max(0, (vh * start - r.top) / distance))
      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    schedule() // first measurement, e.g. after a reload halfway down the page
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, start, end])

  return progress
}