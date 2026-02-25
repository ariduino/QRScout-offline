import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QRScout-offline/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: false,
      scope: '/QRScout-offline/',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,json}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\/QRScout-offline\/.*\.(?:js|css|json|png|svg|ico|ttf)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'qrscout-static-assets',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/QRScout-offline(?:\/.*)?$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'qrscout-pages',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['assets/**/*'],
});
