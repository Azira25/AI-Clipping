import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GANTI 'nama-repo-anda' dengan nama repository GitHub yang Anda buat
  // Contoh: jika repo anda namanya 'youtube-clipper', maka: base: '/youtube-clipper/'
  base: '/nama-repo-anda/', 
})
