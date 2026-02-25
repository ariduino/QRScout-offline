import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './app.tsx';
import './index.css';

if (import.meta.env.DEV) {
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }
} else {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      // Avoid force-reloading while the device may be offline.
    },
    onRegisterError(error) {
      console.error('Service worker registration failed:', error);
    },
  });
}

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
