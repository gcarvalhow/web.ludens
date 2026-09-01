import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@catalog': fileURLToPath(new URL('./src/features/catalog', import.meta.url)),
      '@booking': fileURLToPath(new URL('./src/features/booking', import.meta.url)),
      '@checkout': fileURLToPath(new URL('./src/features/checkout', import.meta.url)),
      '@account': fileURLToPath(new URL('./src/features/account', import.meta.url)),
    },
  },
});
