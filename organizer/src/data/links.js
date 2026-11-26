// Where the public site lives. Set VITE_PUBLIC_SITE_URL when deploying.
const strip = (u) => u.replace(/\/$/, '')

export const PUBLIC_SITE_URL = strip(
  import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173',
)

export const publicUrl = (path = '/') => `${PUBLIC_SITE_URL}${path}`