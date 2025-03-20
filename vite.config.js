import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' 
    ? '/netfonds-gruppe-girls-day-2025/' 
    : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Force Vite to copy the public directory to dist
    copyPublicDir: true
  }
})
