import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sesuai nama repository Anda: 'Ai-Clipping'
  base: '/Ai-Clipping/', 
})
