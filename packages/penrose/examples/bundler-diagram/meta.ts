// penrose example: Penrose.diagram from a bundler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Penrose.diagram from a bundler',
  summary:
    'The starter from Using Penrose with a Bundler: `import * as Penrose from "@penrose/core"` and one `Penrose.diagram(...)` call that lays out two sets, A inside B, into a page element. `s2.shape above s1.shape` is the docs\' own layering line; the bigger set ends up on top, drawn half transparent.',
  section: 'Vanilla JS & Bundlers',
  tags: ['diagram', 'import', 'vite'],
  docs: ['repo/packages/docs-site/docs/ref/bundle.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
