// mermaid example: Mindmap tidy-tree layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mindmap tidy-tree layout',
  summary:
    'Registers the tidy-tree layout package once, then lays mindmaps out as compact, non-overlapping trees, next to the default cose-bilkent layout.',
  section: 'Layouts',
  tags: ['tidy-tree', 'mindmap', 'registerLayoutLoaders', 'layout'],
  docs: [
    'repo/packages/mermaid/src/docs/config/tidy-tree.md',
    'repo/packages/mermaid/src/docs/syntax/mindmap.md',
    'repo/packages/mermaid/src/docs/config/layouts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
