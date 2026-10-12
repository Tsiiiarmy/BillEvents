import { useEffect, useRef, useState } from 'react'
import { UPLOAD_RULES } from '../data/organizer'

export const formatSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`)

function check(file) {
  if (!UPLOAD_RULES.types.includes(file.type)) return `That file type isn’t accepted. Please upload a ${UPLOAD_RULES.label} file.`
  if (file.size === 0) return 'That file appears to be empty. Please choose another one.'
  if (file.size > UPLOAD_RULES.maxMB * 1024 * 1024) return `That file is too large (${formatSize(file.size)}). The limit is ${UPLOAD_RULES.maxMB} MB.`
  return null
}

/**
 * Holds the applicant's documents. Right now the "upload" is simulated in the browser.
 * When the backend exists, replace the setInterval block in `add` with a real upload request
 * that reports progress; nothing else in the UI needs to change.
 */

export default function useDocumentUploads(initial = {}) {
  const [docs, setDocs] = useState(initial) // id → { name, size, type, previewUrl, status, progress }
  const [errors, setErrors] = useState({}) // id → message
  const timers = useRef({})
  const urls = useRef({})

  const stop = (id) => {
    clearInterval(timers.current[id])
    if (urls.current[id]) URL.revokeObjectURL(urls.current[id])
    delete timers.current[id]
    delete urls.current[id]
  }

  const add = (id, file) => {
    const problem = check(file)
    if (problem) { setErrors((e) => ({ ...e, [id]: problem })); return } // an existing file is kept if a replacement is rejected
    stop(id)
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    urls.current[id] = previewUrl
    setErrors((e) => ({ ...e, [id]: undefined }))
    setDocs((d) => ({ ...d, [id]: { name: file.name, size: file.size, type: file.type, previewUrl, status: 'uploading', progress: 0 } }))

    timers.current[id] = setInterval(() => {
      setDocs((d) => {
        const cur = d[id]
        if (!cur) return d
        const progress = Math.min(100, cur.progress + 8 + Math.round(Math.random() * 14))
        if (progress >= 100) { clearInterval(timers.current[id]); return { ...d, [id]: { ...cur, progress: 100, status: 'done' } } }
        return { ...d, [id]: { ...cur, progress } }
      })
    }, 160)
  }

  const remove = (id) => {
    stop(id)
    setDocs((d) => { const n = { ...d }; delete n[id]; return n })
    setErrors((e) => ({ ...e, [id]: undefined }))
  }

  useEffect(() => () => Object.keys({ ...timers.current, ...urls.current }).forEach(stop), []) // tidy up on leaving the page

  return { docs, errors, add, remove }
}