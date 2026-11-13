// Vite build and vitest config for the gallery SPA
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/** `/packages/<pkg>/examples/<ex>/meta.ts` → `<pkg>`. */
const META = /\/packages\/([^/]+)\/examples\/[^/]+\/meta\.ts$/;

export default defineConfig({
  resolve: {
    alias: { '@/': fileURLToPath(new URL('./src/', import.meta.url)) },
  },
  // Relative asset URLs + hash routing: the build runs under any subpath with no rewrites.
  base: './',
  // Examples start workers with { type: 'module' }; the default 'iife' rejects a worker's
  // top-level await and dynamic import().
  worker: { format: 'es' },
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // One chunk per package for all its example metadata, so opening a package
              // with hundreds of examples is one request, not hundreds.
              name: (id: string) => {
                const pkg = META.exec(id)?.[1];
                return pkg ? `meta-${pkg}` : null;
              },
            },
          ],
        },
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts', 'test/**/*.test.ts'],
    environment: 'node',
  },
});
