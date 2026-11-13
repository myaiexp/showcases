// Vite build and vitest config for the gallery SPA
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/** `/packages/<pkg>/examples/<ex>/meta.ts` → `<pkg>`. */
const META = /\/packages\/([^/]+)\/examples\/[^/]+\/meta\.ts$/;

/**
 * three's addons (`three/addons/*`) import the bare `three`, which is the WebGL build.
 * The Three.js gallery runs on `three/webgpu`, so without this an addon would pull in a
 * second copy of the core and its classes would fail `instanceof` against ours. This is
 * what the three.js manual's import map does (`"three": "three.webgpu.js"`), scoped to
 * imports made by the addon files so a WebGL-based package can still import `three`.
 */
const threeAddonsOnWebgpu = {
  name: 'three-addons-on-webgpu',
  enforce: 'pre' as const,
  resolveId(this: { resolve: (id: string, importer?: string) => Promise<unknown> }, id: string, importer?: string) {
    if (id !== 'three' || !importer || !/[/\\]three[/\\]examples[/\\]jsm[/\\]/.test(importer)) return null;
    return this.resolve('three/webgpu', importer);
  },
};

export default defineConfig({
  plugins: [threeAddonsOnWebgpu],
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
