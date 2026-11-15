// penrose example: The experimental bundled ESM build
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The experimental bundled ESM build',
  summary:
    'Since v3.2.0 Penrose also ships `@penrose/core/bundle`, one ES module with every dependency inside, for pages without a bundler or import map. It exports the same `compile`, `optimize` and `toSVG`; this example imports it on demand, waits until those exports are defined (the docs warn they can be `undefined` just after the import), and lays out three sets with it.',
  section: 'Vanilla JS & Bundlers',
  tags: ['bundle', 'ESM', 'compile', 'optimize'],
  docs: ['repo/packages/docs-site/docs/ref/vanilla-js.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
