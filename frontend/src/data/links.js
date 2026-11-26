// Where the organizer portal lives. Set VITE_ORGANIZER_URL when deploying.
const strip = (u) => u.replace(/\/$/, '')

export const ORGANIZER_URL = strip(
  import.meta.env.VITE_ORGANIZER_URL || 'http://localhost:5174',
)

export const organizerUrl = (path = '/organizer') => `${ORGANIZER_URL}${path}`