/* One seamless wave, two periods wide (2880 units = 2 × 1440).
   Sliding it left by half its width lands on an identical shape. */
const wave = (base, amp) =>
  `M0 ${base}C180 ${base - amp} 540 ${base - amp} 720 ${base}` +
  `S1260 ${base + amp} 1440 ${base}` +
  `S1980 ${base - amp} 2160 ${base}` +
  `S2700 ${base + amp} 2880 ${base}V120H0Z`

const PRESETS = {
  // Bottom of the hero: aqua swell over navy, last layer melts into the page.
  hero: [
    { base: 46, amp: 22, dur: '18s', fill: 'fill-aqua/30' },
    { base: 60, amp: 16, dur: '12s', fill: 'fill-aqua/50', reverse: true },
    { base: 84, amp: 12, dur: '24s', fill: 'fill-white dark:fill-ink' },
  ],
  // Top of the footer: waves rise out of the page into the navy footer.
  footer: [
    { base: 50, amp: 20, dur: '20s', fill: 'fill-aqua/25' },
    { base: 64, amp: 14, dur: '14s', fill: 'fill-navy/60', reverse: true },
    { base: 84, amp: 10, dur: '26s', fill: 'fill-navy' },
  ],
}

/** Decorative drifting waves. Give it a height and a position via className. */
export function WaveBand({ variant = 'hero', className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {PRESETS[variant].map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className={`wave-layer absolute bottom-0 left-0 h-full w-[200%] ${l.reverse ? 'wave-reverse' : ''}`}
          style={{ '--dur': l.dur }}
        >
          <path className={l.fill} d={wave(l.base, l.amp)} />
        </svg>
      ))}
    </div>
  )
}