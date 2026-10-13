import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '../../components/common/Icon'
import { ScannerView } from '../../components/entry/ScannerView'
import useOrders from '../../hooks/useOrders'
import { whenLabel } from '../../utils/datetime'
import logoReverse from '../../assets/logo/billevents-logo-reverse.svg'

const ANY = '__any__'

export default function EntryPage() {
  const { orders } = useOrders()
  const [gate, setGate] = useState(null)
  const [session, setSession] = useState({ in: 0, refused: 0 })

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

  const onResult = (r) =>
    setSession((s) =>
      r.kind === 'ok' ? { ...s, in: s.in + 1 } : { ...s, refused: s.refused + 1 },
    )

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