import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const cladAliases = {
  $atoms: path.join(ROOT, 'src/atoms'),
  $molecules: path.join(ROOT, 'src/molecules'),
  $sockets: path.join(ROOT, 'src/sockets'),
  $plugs: path.join(ROOT, 'src/plugs'),
  $frames: path.join(ROOT, 'src/frames'),
  $recipes: path.join(ROOT, 'src/recipes'),
  $views: path.join(ROOT, 'src/views'),
  $apps: path.join(ROOT, 'src/apps'),
};

export default defineConfig({
  resolve: {
    alias: cladAliases,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
