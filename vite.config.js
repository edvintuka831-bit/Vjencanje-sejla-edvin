import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify postavlja varijablu URL tokom builda – koristi se za apsolutni
// link na sliku za pregled (Viber/WhatsApp/Facebook trebaju puni URL).
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')

// SITE_VARIANT=restoran: build za zasebnu Netlify stranicu samo za svadbeno slavlje.
// Početna stranica (/) tada prikazuje restoransku pozivnicu; /restoran radi i dalje.
const variant = process.env.SITE_VARIANT || ''
const outDir = resolve(import.meta.dirname, 'dist')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'og-absolute-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', siteUrl)
      },
    },
    {
      name: 'restoran-as-home',
      apply: 'build',
      closeBundle() {
        if (variant !== 'restoran') return
        copyFileSync(resolve(outDir, 'restoran/index.html'), resolve(outDir, 'index.html'))
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
