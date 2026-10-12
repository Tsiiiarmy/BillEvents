import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

/**
 * Renders any string to a PNG data URL.
 *
 * The code is always dark navy on white, in both themes. A white-on-dark QR
 * is readable by most phones but not by all gate scanners, and a ticket that
 * fails at the door is the worst bug this product could have.
 */
const OPTIONS = {
  errorCorrectionLevel: 'M',
  margin: 1,
  color: { dark: '#21335E', light: '#FFFFFF' },
}

export default function useQrCode(value, size = 320) {
  const [src, setSrc] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!value) return undefined
    let alive = true
    setSrc('')
    setError(false)

    QRCode.toDataURL(String(value), { ...OPTIONS, width: size })
      .then((url) => alive && setSrc(url))
      .catch(() => alive && setError(true))

    return () => {
      alive = false
    }
  }, [value, size])

  return { src, error }
}