// g6 example: Graph option plugins: string, object and function forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option plugins: string, object and function forms',
  summary:
    'A minimap by name, a grid-line with options and a key, and a watermark built by a function that reads the graph; a button recolours the grid with updatePlugin.',
  section: 'Graph',
  tags: ['plugins', 'minimap', 'grid-line', 'watermark', 'updatePlugin'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
