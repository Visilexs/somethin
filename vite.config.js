import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // vendor code changes rarely — keep it in its own long-cached chunk
        manualChunks: { react: ['react', 'react-dom'], motion: ['motion', 'lenis'] },
      },
    },
  }
})
