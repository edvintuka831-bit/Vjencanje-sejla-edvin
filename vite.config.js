import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify postavlja varijablu URL tokom builda – koristi se za apsolutni
// link na sliku za pregled (Viber/WhatsApp/Facebook trebaju puni URL).
const siteUrl = (process.env.URL || '').replace(/\/$/, '')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'og-absolute-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', siteUrl)
      },
    },
  ],
  build: {
    target: 'es2019',
    rollupOptions: {
      // Tri stranice: pozivnica za cijeli program (/), pozivnica za svadbeno
      // slavlje u restoranu (/restoran) i privatni admin panel (/admin)
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        restoran: resolve(import.meta.dirname, 'restoran/index.html'),
        admin: resolve(import.meta.dirname, 'admin/index.html'),
      },
    },
  },
})
