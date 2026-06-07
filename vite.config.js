import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: "./public/manifest.json",
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  base: "/maestrocat/",
  build: {
    outDir: "docs",
  },
  server: {
    allowedHosts: ["tip-greatest-supplements-club.trycloudflare.com"]
  }
})
