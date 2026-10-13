// ─────────────────────────────────────────────────────────────
// GATE ENTRY CONFIGURATION
// How long a result stays on screen, and how each outcome looks.
// ─────────────────────────────────────────────────────────────

/** Milliseconds a scan result is shown before the camera resumes. */
export const RESULT_MS = 3000

/** Ignore a repeat of the same code within this window (camera sees it many times a second). */
export const REPEAT_MS = 2500

/** Short buzz patterns. Ignored where the device has no vibration motor. */
export const BUZZ = { ok: 60, warn: [40, 60, 40], bad: [70, 70, 70] }

/**
 * Every outcome the gate can produce.
 * `tone` drives the colour wash, `icon` and `headline` carry the meaning —
 * never colour alone, because a bright doorway washes colour out.
 */
export const OUTCOMES = {
  ok: {
    tone: 'ok',
    icon: 'check',
    headline: 'Let them in',
    sub: 'Ticket valid and now checked in.',
    buzz: BUZZ.ok,
  },
  used: {
    tone: 'warn',
    icon: 'refresh',
    headline: 'Already used',
    sub: 'This ticket was scanned earlier.',
    buzz: BUZZ.warn,
  },
  wrong_event: {
    tone: 'warn',
    icon: 'alert',
    headline: 'Wrong event',
    sub: 'This ticket is for a different event.',
    buzz: BUZZ.warn,
  },
  void: {
    tone: 'bad',
    icon: 'x',
    headline: 'Not valid',
    sub: 'This ticket has been cancelled or has expired.',
    buzz: BUZZ.bad,
  },
  unknown: {
    tone: 'bad',
    icon: 'x',
    headline: 'Not recognised',
    sub: 'No ticket on this device matches that code.',
    buzz: BUZZ.bad,
  },
  invalid: {
    tone: 'bad',
    icon: 'x',
    headline: 'Not a BillEvents ticket',
    sub: 'That code did not come from BillEvents.',
    buzz: BUZZ.bad,
  },
}

/** Colour wash per tone. Aqua for go, amber for stop-and-check, red for refuse. */
export const TONES = {
  ok: {
    panel: 'bg-aqua text-navy',
    ring: 'ring-aqua',
    bar: 'bg-navy/30',
    frame: 'border-aqua',
  },
  warn: {
    panel: 'bg-amber-400 text-navy',
    ring: 'ring-amber-400',
    bar: 'bg-navy/30',
    frame: 'border-amber-400',
  },
  bad: {
    panel: 'bg-red-600 text-white',
    ring: 'ring-red-500',
    bar: 'bg-white/35',
    frame: 'border-red-500',
  },
}

/** Human text for a camera failure. */
export const CAMERA_ERRORS = {
  insecure: 'The camera needs a secure connection. Open this page on localhost or over https.',
  NotAllowedError: 'Camera access was blocked. Allow it in your browser settings, then try again.',
  NotFoundError: 'No camera was found on this device.',
  NotReadableError: 'The camera is already in use by another app. Close it and try again.',
  OverconstrainedError: 'No suitable camera was found on this device.',
  unknown: 'The camera could not be started.',
}