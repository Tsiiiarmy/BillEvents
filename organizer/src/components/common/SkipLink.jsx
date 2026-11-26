// Lets keyboard users jump past the navbar straight to the page content.
export function SkipLink() {
  return (
    <a href="#main" className="sr-only z-[60] rounded bg-aqua px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
      Skip to content
    </a>
  )
}