import { useEffect, useRef, useState } from 'react'

import { Icon } from '../common/Icon'
import { ScanResult } from './ScanResult'
import useScanner from '../../hooks/useScanner'
import { CAMERA_ERRORS, RESULT_MS, REPEAT_MS, OUTCOMES } from '../../data/entry'
import { verifyAndCheckIn } from '../../utils/entry'

export function ScannerView({ gateEventId, onResult }) {
  const [result, setResult] = useState(null)
  const [manual, setManual] = useState(false)
  const [typed, setTyped] = useState('')
  const lastRef = useRef({ code: '', at: 0 })
  const timerRef = useRef(null)

  const handle = (raw) => {
    const now = Date.now()
    // The camera reads the same square ~30 times a second. Ignore repeats.
    if (raw === lastRef.current.code && now - lastRef.current.at < REPEAT_MS) return
    lastRef.current = { code: raw, at: now }

    const verdict = verifyAndCheckIn(raw, gateEventId)
    setResult(verdict)
    onResult?.(verdict)

    const buzz = OUTCOMES[verdict.kind]?.buzz
    if (buzz && navigator.vibrate) navigator.vibrate(buzz)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setResult(null), RESULT_MS)
  }

  const { videoRef, state, error, start, stop, hasTorch, torch, toggleTorch } = useScanner({
    onDecode: handle,
    paused: Boolean(result) || manual,
  })

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const dismiss = () => {
    clearTimeout(timerRef.current)
    setResult(null)
  }

  const submitTyped = (e) => {
    e.preventDefault()
    if (!typed.trim()) return
    lastRef.current = { code: '', at: 0 }
    handle(typed)
    setTyped('')
  }

  const corner = 'absolute h-10 w-10 border-aqua'

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-navy-3 ring-1 ring-white/10">
        {/* Camera */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={`h-full w-full object-cover transition ${state === 'running' ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Framing guides */}
        {state === 'running' && !result && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-navy/35" />
            <div className="absolute inset-[14%] rounded-2xl bg-transparent shadow-[0_0_0_9999px_rgba(24,37,70,.55)]" />
            <div className="absolute inset-[14%]">
              <span className={`${corner} left-0 top-0 rounded-tl-xl border-l-4 border-t-4`} />
              <span className={`${corner} right-0 top-0 rounded-tr-xl border-r-4 border-t-4`} />
              <span className={`${corner} bottom-0 left-0 rounded-bl-xl border-b-4 border-l-4`} />
              <span className={`${corner} bottom-0 right-0 rounded-br-xl border-b-4 border-r-4`} />
              <span className="scanline absolute inset-x-4 top-1/2 h-0.5 rounded-full bg-aqua shadow-[0_0_14px_3px_rgba(107,214,218,.7)]" />
            </div>
            <p className="absolute inset-x-0 bottom-5 text-center text-sm font-bold text-white/85">
              Hold the ticket inside the frame
            </p>
          </div>
        )}

        {/* Idle */}
        {state === 'idle' && (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/10 text-aqua">
                <Icon n="camera" className="h-8 w-8" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold text-white">Ready to scan</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-white/65">
                Your browser will ask for camera permission. Nothing is recorded or uploaded.
              </p>
              <button
                type="button"
                onClick={start}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 font-heading font-bold text-navy transition hover:-translate-y-0.5"
              >
                <Icon n="camera" className="h-5 w-5" />
                Start camera
              </button>
            </div>
          </div>
        )}

        {/* Starting */}
        {state === 'starting' && (
          <div className="absolute inset-0 grid place-items-center">
            <span
              aria-hidden="true"
              className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-aqua motion-reduce:animate-none"
            />
            <span className="sr-only">Starting the camera</span>
          </div>
        )}

        {/* Error */}
        {state === 'error' && (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/20 text-red-300">
                <Icon n="alert" className="h-8 w-8" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold text-white">
                The camera isn’t available
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-white/65">
                {CAMERA_ERRORS[error] || CAMERA_ERRORS.unknown}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={start}
                  className="rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-navy"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => setManual(true)}
                  className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Type the code instead
                </button>
              </div>
            </div>
          </div>
        )}

        {result && <ScanResult result={result} onDismiss={dismiss} />}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {state === 'running' && (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white/80 transition hover:bg-white/10"
            >
              <Icon n="x" className="h-4 w-4" />
              Stop camera
            </button>
          )}
          {hasTorch && state === 'running' && (
            <button
              type="button"
              onClick={toggleTorch}
              aria-pressed={torch}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                torch ? 'bg-aqua text-navy' : 'border border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              <Icon n="flash" className="h-4 w-4" />
              Light
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setManual((m) => !m)}
          aria-expanded={manual}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white/80 transition hover:bg-white/10"
        >
          <Icon n="keyboard" className="h-4 w-4" />
          {manual ? 'Hide keypad' : 'Enter code'}
        </button>
      </div>

      {manual && (
        <form
          onSubmit={submitTyped}
          className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur"
        >
          <label htmlFor="gate-code" className="block text-sm font-bold text-white">
            Ticket number
          </label>
          <p className="mt-1 text-xs text-white/55">
            Printed under the QR code, for when a screen is cracked or too dark to scan.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              id="gate-code"
              value={typed}
              onChange={(e) => setTyped(e.target.value.toUpperCase())}
              placeholder="4JTN-9QKD-2MR7"
              autoComplete="off"
              spellCheck="false"
              className="min-w-0 flex-1 rounded-xl border border-white/20 bg-navy-3 px-4 py-3 font-mono tracking-wider text-white outline-none transition placeholder:text-white/25 focus:border-aqua focus:ring-4 focus:ring-aqua/30"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-aqua px-5 font-heading font-bold text-navy transition hover:-translate-y-0.5"
            >
              Check
            </button>
          </div>
        </form>
      )}
    </div>
  )
}