import useOrganizer from '../../hooks/useOrganizer'
import { STATUS_META } from '../../data/organizer'

export function DevStatusSwitcher() {
  const { status, setOrganizer } = useOrganizer()
  if (!import.meta.env.DEV) return null

  const change = (value) =>
    setOrganizer({
      status: value,
      application: value === 'none' ? undefined : { id: 'BE-204817', submittedAt: new Date().toISOString() },
    })

  return (
    <label className="fixed bottom-4 left-4 z-[70] grid gap-1 rounded-xl bg-navy p-2.5 text-[11px] font-bold text-white shadow-xl ring-1 ring-white/20">
      <span className="text-aqua">DEV · Organizer status</span>
      <select value={status} onChange={(e) => change(e.target.value)} className="rounded-lg bg-white/10 px-2 py-1.5 text-xs font-medium text-white [&>option]:text-navy">
        {Object.entries(STATUS_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
      </select>
    </label>
  )
}