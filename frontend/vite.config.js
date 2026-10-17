import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// `npm run dev`        → normal: http://localhost:5173, this computer only
// `npm run dev:phone`  → HTTPS + visible on your Wi-Fi, so a phone can open
//                        /entry and use its camera (the camera needs HTTPS).
export default defineConfig(({ mode }) => {
  const phone = mode === 'phone'

  return {
    plugins: [react(), tailwindcss(), phone && basicSsl()].filter(Boolean),
    server: phone ? { host: true } : {},
  }
})