import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'

const buildTime = new Date().toISOString()

export default defineConfig({
  plugins: [vue(), banner('Smartuil(https://www.bonan.online/)') as any],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    chunkSizeWarningLimit: 4096,
  },
})

