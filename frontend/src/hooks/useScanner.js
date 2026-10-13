import { useCallback, useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'

/**
 * Camera + QR decoding. The loop downscales each frame to 640px before
 * decoding — full-resolution frames make a mid-range phone crawl.
 *
 * Returns { videoRef, state, error, start, stop, hasTorch, torch, toggleTorch }.
 * state: idle | starting | running | error
 */
export default function useScanner({ onDecode, paused = false }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const pausedRef = useRef(paused)
  const decodeRef = useRef(onDecode)

  const [state, setState] = useState('idle')
  const [error, setError] = useState('unknown')
  const [hasTorch, setHasTorch] = useState(false)
  const [torch, setTorch] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    decodeRef.current = onDecode
  }, [onDecode])

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setTorch(false)
    setHasTorch(false)
    setState('idle')
  }, [])

  const start = useCallback(async () => {
    if (streamRef.current) return
    setState('starting')

    // getUserMedia only exists in a secure context (https or localhost).
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('insecure')
      setState('error')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })
      const video = videoRef.current
      if (!video) {
        stream.getTracks().forEach((t) => t.stop())
        return
      }

      streamRef.current = stream
      video.srcObject = stream
      video.setAttribute('playsinline', 'true')
      video.muted = true
      await video.play()

      const track = stream.getVideoTracks()[0]
      setHasTorch(Boolean(track?.getCapabilities?.().torch))
      setState('running')
    } catch (e) {
      setError(e?.name || 'unknown')
      setState('error')
    }
  }, [])

  const toggleTorch = useCallback(async () => {
    const track = streamRef.current?.getVideoTracks()[0]
    if (!track) return
    const next = !torch
    try {
      await track.applyConstraints({ advanced: [{ torch: next }] })
      setTorch(next)
    } catch {
      setHasTorch(false)
    }
  }, [torch])

  // The decode loop. Runs only while the camera is live.
  useEffect(() => {
    if (state !== 'running') return undefined

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)

      const video = videoRef.current
      if (!video || pausedRef.current) return
      if (video.readyState !== video.HAVE_ENOUGH_DATA) return

      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return

      const scale = Math.min(1, 640 / Math.max(vw, vh))
      canvas.width = Math.round(vw * scale)
      canvas.height = Math.round(vh * scale)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const found = jsQR(frame.data, frame.width, frame.height, {
        inversionAttempts: 'dontInvert',
      })
      if (found?.data) decodeRef.current?.(found.data)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [state])

  // Release the camera when the page goes away.
  useEffect(() => stop, [stop])

  return { videoRef, state, error, start, stop, hasTorch, torch, toggleTorch }
}