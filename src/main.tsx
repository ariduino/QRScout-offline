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
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      updateSW(true);
    },
    onRegisteredSW(_swUrl, registration) {
      if (!registration) {
        return;
      }

      const intervalMs = 60 * 60 * 1000;
      setInterval(() => {
        registration.update();
      }, intervalMs);

      window.addEventListener('online', () => {
        registration.update();
      });
    },
    onRegisterError(error) {
      console.error('Service worker registration failed:', error);
    },
  });
}

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
