import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * No secrets are injected at build time, by design.
 *
 * Anything Vite inlines here is written verbatim into dist/assets/index-*.js and
 * served to every visitor — a build-time "secret" is a public secret. API keys for
 * the threat-intelligence providers live in the Cloudflare Worker (see worker/),
 * which the browser talks to without ever seeing a key.
 *
 * Only genuinely public values belong in VITE_* variables (e.g. the worker's URL).
 */
export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
