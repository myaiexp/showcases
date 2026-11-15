// Vite build and vitest config for the gallery SPA
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { packageWatcher } from './scripts/dev/package-watcher.ts';
import { threeAddonsOnWebgpu } from './scripts/vite/three-addons.ts';

/** `/packages/<pkg>/examples/<ex>/meta.ts` → `<pkg>`. */
const META = /\/packages\/([^/]+)\/examples\/[^/]+\/meta\.ts$/;

/**
 * Pizzicato replaces AudioNode.prototype.connect page-wide when it loads, dropping
 * connect()'s output and input indices (which Tone.js and others rely on). Every bare
 * `pizzicato` import resolves to packages/pizzicato/shared/entry.ts, which captures the
 * native method first and reinstalls one that keeps both. entry.ts itself imports the
 * library by its file path, which this does not match.
 */
const pizzicatoEntry = {
  name: 'pizzicato-entry',
  enforce: 'pre' as const,
  resolveId(id: string) {
    return id === 'pizzicato' ? fileURLToPath(new URL('./packages/pizzicato/shared/entry.ts', import.meta.url)) : null;
  },
};

export default defineConfig({
  // packageWatcher: packages/ is watched per directory and its vendored docs not at all,
  // because chokidar's per-file watches ran the VPS out of inotify watches.
  plugins: [threeAddonsOnWebgpu, pizzicatoEntry, packageWatcher()],
  resolve: {
    alias: [
      { find: '@/', replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
      // plotly.js's `main` is its CommonJS source tree (hundreds of modules, stackgl shims,
      // an inlined MapLibre worker). Its own built bundle is what the docs load from a
      // <script> tag; TypeScript still reads the types from lib/index.d.ts.
      { find: /^plotly\.js$/, replacement: 'plotly.js/dist/plotly.min.js' },
      // @antv/l7-component's `browser` field points at its UMD bundle, which has no ESM
      // exports, so `export * from '@antv/l7-component'` in @antv/l7 would export no
      // Marker, Popup or controls in the browser build. Its `module` build has them.
      { find: /^@antv\/l7-component$/, replacement: '@antv/l7-component/es/index.js' },
    ],
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
