import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.js': 'pdfjs-dist/build/pdf.worker.mjs',
    },
  },
})