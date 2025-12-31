import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'

export default defineConfig({
  plugins: [vue(), banner('Smartuil(https://www.bonan.online/)') as any],
  build: {
    chunkSizeWarningLimit: 4096,
  },
})
