import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const host = process.env.TAURI_DEV_HOST;

const cladAliases = {
  $atoms: path.join(ROOT, 'src/atoms'),
  $molecules: path.join(ROOT, 'src/molecules'),
  $sockets: path.join(ROOT, 'src/sockets'),
  $plugs: path.join(ROOT, 'src/plugs'),
  $frames: path.join(ROOT, 'src/frames'),
  $recipes: path.join(ROOT, 'src/recipes'),
  $views: path.join(ROOT, 'src/views'),
  $apps: path.join(ROOT, 'src/apps'),
} as const;

// https://vite.dev/config/ — aligned with pnpm create tauri-app -t vanilla-ts --tauri-version 2
export default defineConfig({
  root: ROOT,
  appType: 'spa',
  clearScreen: false,
  resolve: {
    alias: cladAliases,
  },
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
  },
});
