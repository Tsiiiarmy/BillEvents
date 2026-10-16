import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { ScannerView } from '../../components/entry/ScannerView'
import useOrders from '../../hooks/useOrders'
import { RECENT_LIMIT } from '../../data/entry'
import { whenLabel } from '../../utils/datetime'
import logoReverse from '../../assets/logo/billevents-logo-reverse.svg'

const ANY = '__any__'

const hhmm = (iso) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

export default function EntryPage() {
  const { orders, undoCheckIn } = useOrders()
  const [gate, setGate] = useState(null)
  const [session, setSession] = useState({ in: 0, refused: 0 })
  const [recent, setRecent] = useState([]) // this shift's admissions, newest first
  const [confirming, setConfirming] = useState(null) // code awaiting "Yes, undo"
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.title = 'Gate Entry — BillEvents'
  }, [])

  // One row per event that has tickets sold on this device.
  const gates = useMemo(() => {
    const map = new Map()
    orders.forEach((o) => {
      const key = String(o.eventId)
      const row = map.get(key) ?? {
        id: key,
        title: o.eventTitle,
        date: o.eventDate,
        start: o.eventStart,
        venue: o.eventVenue,
        city: o.eventCity,
        grad: o.eventGrad,
        image: o.eventImage,
        total: 0,
        used: 0,
      }
      row.total += o.tickets.length
      row.used += o.tickets.filter((t) => t.status === 'used').length
      map.set(key, row)
    })
    return [...map.values()]
  }, [orders])

  const current = gate === ANY ? null : gates.find((g) => g.id === gate)
  const totals = gate === ANY
    ? gates.reduce((a, g) => ({ total: a.total + g.total, used: a.used + g.used }), { total: 0, used: 0 })
    : { total: current?.total ?? 0, used: current?.used ?? 0 }

  const onResult = (r) => {
    setSession((s) =>
      r.kind === 'ok' ? { ...s, in: s.in + 1 } : { ...s, refused: s.refused + 1 },
    )
    if (r.kind !== 'ok') return

    setNotice('')
    setConfirming(null)
    setRecent((list) =>
      [
        {
          code: r.code,
          name: r.order?.contact?.name || 'Ticket holder',
          tier: r.ticket?.tierName,
          seat: r.ticket?.seat,
          event: r.order?.eventTitle,
          at: r.ticket?.checkedInAt ?? new Date().toISOString(),
        },
        ...list.filter((x) => x.code !== r.code),
      ].slice(0, RECENT_LIMIT),
    )
  }

  // Codes currently checked in. Used to hide list rows that were undone
  // elsewhere or wiped via Settings → Data on this device.
  const usedCodes = useMemo(() => {
    const set = new Set()
    orders.forEach((o) =>
      o.tickets.forEach((t) => {
        if (t.status === 'used') set.add(t.code)
      }),
    )
    return set
  }, [orders])
  const recentLive = recent.filter((r) => usedCodes.has(r.code))

  const undo = (item) => {
    const done = undoCheckIn(item.code)
    setConfirming(null)
    setRecent((list) => list.filter((x) => x.code !== item.code))
    if (done) {
      setSession((s) => ({ ...s, in: Math.max(0, s.in - 1) }))
      setNotice(`Check-in undone for ${item.name}. Ticket ${item.code} can be scanned again.`)
    } else {
      setNotice(`Ticket ${item.code} isn't checked in any more, so there was nothing to undo.`)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-navy text-white">
      {/* Brand atmosphere, same language as the hero and auth panels */}
      <div
        aria-hidden="true"
        className="animate-drift absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-aqua/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float absolute -bottom-40 -right-24 -z-10 h-96 w-96 rounded-full bg-[#3364AA]/25 blur-3xl"
      />

      <header className="border-b border-white/10">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoReverse} alt="BillEvents" className="h-7 w-auto" />
            <span className="rounded-full bg-aqua/15 px-3 py-1 text-xs font-bold text-aqua">
              Gate Entry
            </span>
          </div>
          {gate ? (
            <button
              type="button"
              onClick={() => setGate(null)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition hover:text-aqua"
            >
              <Icon n="arrowleft" className="h-4 w-4" />
              Change event
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition hover:text-aqua"
            >
              <Icon n="arrowleft" className="h-4 w-4" />
              Leave
            </Link>
          )}
        </div>
      </header>

      <main id="main" className="wrap py-8 sm:py-12">
        {!gate ? (
          /* ── Step 1: which door are you on ── */
          <div className="mx-auto max-w-2xl">
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">Which event are you on?</h1>
            <p className="mt-2 text-white/65">
              Pick the event you’re checking people into. Tickets for anything else will be turned
              away.
            </p>

            {gates.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white/60">
                  <Icon n="ticket" className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-heading text-xl font-bold">No tickets on this device</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
                  This preview reads tickets from the browser it was bought in. Buy a ticket first,
                  then come back here to scan it.
                </p>
                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-navy"
                >
                  Browse events
                  <Icon n="arrow" className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <ul className="mt-8 grid gap-3">
                {gates.map((g) => {
                  const when = whenLabel({ eventStart: g.start })
                  return (
                    <li key={g.id}>
                      <button
                        type="button"
                        onClick={() => setGate(g.id)}
                        className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-0.5 hover:border-aqua/60 hover:bg-white/10"
                      >
                        <span
                          className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-linear-to-br ${
                            g.grad || 'from-navy to-aqua'
                          }`}
                        >
                          {g.image ? (
                            <img src={g.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <Icon n="ticket" className="h-6 w-6" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-lg font-bold leading-snug">
                            {g.title}
                          </span>
                          <span className="mt-1 block text-sm text-white/60">
                            {g.date} · {g.venue}
                          </span>
                          <span className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold">
                            <span className="rounded-full bg-aqua/15 px-2.5 py-1 text-aqua">
                              {g.used} / {g.total} checked in
                            </span>
                            {when && (
                              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/70">
                                {when}
                              </span>
                            )}
                          </span>
                        </span>
                        <Icon n="arrow" className="h-5 w-5 shrink-0 text-aqua" />
                      </button>
                    </li>
                  )
                })}

                <li className="mt-2">
                  <button
                    type="button"
                    onClick={() => setGate(ANY)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/20 p-4 text-left text-sm text-white/65 transition hover:border-white/40 hover:text-white"
                  >
                    <Icon n="scan" className="h-5 w-5 shrink-0" />
                    <span>
                      <span className="font-bold">Accept any event</span> — useful for testing, not
                      for a real door.
                    </span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          /* ── Step 2: scanning ── */
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-start">
            <div>
              <ScannerView gateEventId={gate === ANY ? null : gate} onResult={onResult} />
            </div>

            <div className="grid gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-aqua">Now scanning</p>
                <h1 className="mt-1 font-heading text-2xl font-bold leading-tight sm:text-3xl">
                  {current ? current.title : 'Any event'}
                </h1>
                {current && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/65">
                    <span className="flex items-center gap-1.5">
                      <Icon n="calendar" className="h-4 w-4" />
                      {current.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon n="pin" className="h-4 w-4" />
                      {current.venue}, {current.city}
                    </span>
                  </p>
                )}
              </div>

              {/* Door progress */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/60">Checked in</p>
                    <p className="font-heading text-3xl font-bold">
                      {totals.used}
                      <span className="text-lg text-white/50"> / {totals.total}</span>
                    </p>
                  </div>
                  <p className="text-sm font-bold text-aqua">
                    {totals.total - totals.used} still to arrive
                  </p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-aqua transition-all duration-700"
                    style={{
                      width: `${totals.total ? (totals.used / totals.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* This shift */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                    <Icon n="check" className="h-3.5 w-3.5" />
                    Let in
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold text-aqua">{session.in}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                    <Icon n="alert" className="h-3.5 w-3.5" />
                    Turned away
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold">{session.refused}</p>
                </div>
              </div>

              {/* Recently let in — the undo lives here */}
              <section
                aria-labelledby="recent-heading"
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h2
                  id="recent-heading"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50"
                >
                  <Icon n="clock" className="h-3.5 w-3.5" />
                  Recently let in
                </h2>

                {recentLive.length === 0 ? (
                  <p className="mt-3 text-sm text-white/55">
                    People you let in this shift appear here, so a mistake can be undone.
                  </p>
                ) : (
                  <ul className="mt-3 divide-y divide-white/10">
                    {recentLive.map((r) => (
                      <li key={r.code} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold">{r.name}</p>
                            <p className="mt-0.5 truncate text-xs text-white/60">
                              {r.tier} · Ticket {r.seat} · {hhmm(r.at)}
                            </p>
                            {gate === ANY && r.event && (
                              <p className="mt-0.5 truncate text-xs text-white/45">{r.event}</p>
                            )}
                            <p className="mt-1 font-mono text-xs tracking-wider text-white/50">
                              {r.code}
                            </p>
                          </div>
                          {confirming !== r.code && (
                            <button
                              type="button"
                              onClick={() => {
                                setNotice('')
                                setConfirming(r.code)
                              }}
                              aria-label={`Undo check-in for ${r.name}, ticket ${r.code}`}
                              className="shrink-0 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/80 transition hover:border-amber-400 hover:text-amber-400"
                            >
                              Undo
                            </button>
                          )}
                        </div>

                        {confirming === r.code && (
                          <div
                            role="group"
                            aria-label={`Confirm undo for ${r.name}`}
                            className="mt-3 rounded-xl bg-amber-400/10 p-3 ring-1 ring-amber-400/40"
                          >
                            <p className="flex items-start gap-2 text-sm text-white/85">
                              <Icon n="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                              <span>
                                Undo this check-in? The ticket becomes valid again and must be
                                scanned to get in.
                              </span>
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                autoFocus
                                onClick={() => undo(r)}
                                className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-navy transition hover:bg-amber-300"
                              >
                                Yes, undo
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirming(null)}
                                className="rounded-full px-4 py-2 text-xs font-bold text-white/70 transition hover:text-white"
                              >
                                Keep
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <p aria-live="polite" className="text-sm font-bold text-aqua empty:hidden mt-3">
                  {notice}
                </p>
              </section>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/65">
                <p className="flex items-start gap-2">
                  <Icon n="shield" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                  <span>
                    <span className="font-bold text-white">Preview build.</span> Tickets are verified
                    against this browser’s storage, not a server. A real gate checks a signed code
                    against BillEvents, so a screenshot of someone else’s ticket can’t get in.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}