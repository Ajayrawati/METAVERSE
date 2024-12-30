import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true, // Adjusts the origin of the host header
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'), // Keep the path as is
        secure: false, // Disable SSL verification if using self-signed certificates
      },
    },
  },
})
