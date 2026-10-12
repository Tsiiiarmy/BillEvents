import { useRef, useState } from 'react'
import { Icon } from '../common/Icon'
import { UPLOAD_RULES } from '../../data/organizer'
import { formatSize } from '../../hooks/useDocumentUploads'

const small = 'rounded-full border border-navy/20 px-4 py-1.5 text-xs font-bold transition hover:bg-navy/5 disabled:pointer-events-none disabled:opacity-40 dark:border-white/25 dark:hover:bg-white/10'

export function DocumentUpload({ doc, file, error, onSelect, onRemove }) {
  const input = useRef(null)
  const [drag, setDrag] = useState(false)
  const pick = () => input.current?.click()
  const take = (f) => { if (f) onSelect(f) }
  const busy = file?.status === 'uploading'
  const done = file?.status === 'done'

  return (
    <section
      aria-labelledby={`${doc.id}-title`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files[0]) }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={`${doc.id}-title`} className="font-heading font-bold">{doc.title}</h3>
        <span className="text-xs font-bold text-mortar dark:text-white/55">{doc.required ? 'Required' : 'Optional'}</span>
      </div>
      <p className="mb-3 mt-0.5 text-sm text-mortar dark:text-white/65">{doc.text}</p>

      <input ref={input} type="file" accept={UPLOAD_RULES.accept} tabIndex={-1} aria-hidden="true" className="sr-only"
        onChange={(e) => { take(e.target.files[0]); e.target.value = '' }} />

      {!file ? (
        <div className={`grid justify-items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition duration-300 ${
          drag ? 'scale-[1.01] border-aqua bg-aqua/15' : error ? 'border-red-500' : 'border-navy/20 dark:border-white/25'}`}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-teal dark:bg-navy dark:text-aqua"><Icon n="upload" className="h-6 w-6" /></span>
          <p className="hidden text-sm sm:block">Drag and drop a file here, or</p>
          <button type="button" onClick={pick} aria-invalid={error ? true : undefined} aria-describedby={error ? `${doc.id}-err` : undefined}
            className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-2 dark:bg-aqua dark:text-navy">
            Choose file
          </button>
          <p className="text-xs text-mortar dark:text-white/55">{UPLOAD_RULES.label} · up to {UPLOAD_RULES.maxMB} MB</p>
        </div>
      ) : (
        <div className={`rounded-2xl border p-4 transition ${done ? 'border-aqua/60 bg-aqua/5' : 'border-navy/15 dark:border-white/20'}`}>
          <div className="flex items-center gap-4">
            {file.previewUrl
              ? <img src={file.previewUrl} alt={`Preview of ${file.name}`} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-mist text-teal dark:bg-navy dark:text-aqua"><Icon n="file" className="h-7 w-7" /></span>}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{file.name}</p>
              <p className="text-xs text-mortar dark:text-white/60">{formatSize(file.size)} · {busy ? `Uploading… ${file.progress}%` : 'Uploaded'}</p>
              {busy && (
                <div role="progressbar" aria-label={`Uploading ${file.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={file.progress}
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy/10 dark:bg-white/15">
                  <div className="h-full rounded-full bg-aqua transition-all duration-200" style={{ width: `${file.progress}%` }} />
                </div>
              )}
            </div>
            {done && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-aqua text-navy"><Icon n="check" className="h-4 w-4" /></span>}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={pick} disabled={busy} className={small}>Replace</button>
            <button type="button" onClick={onRemove} className={small}>Remove</button>
          </div>
        </div>
      )}

      {error && <p id={`${doc.id}-err`} role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
      <span className="sr-only" aria-live="polite">{done ? `${doc.title} uploaded` : ''}</span>
    </section>
  )
}