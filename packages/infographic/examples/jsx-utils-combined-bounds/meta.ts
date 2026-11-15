// AntV Infographic example: JSX utilities: getCombinedBounds merges Bounds, not nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX utilities: getCombinedBounds merges Bounds, not nodes',
  summary:
    'getCombinedBounds is pure geometry: it takes a list of Bounds objects you already measured and returns their union, with no tree walk. Here two bounds are measured once with getElementBounds and merged; the steps merge one, two and three of them and print the result.',
  section: 'JSX utilities',
  tags: ['getCombinedBounds', 'getElementBounds', 'Bounds', 'union', 'null'],
  docs: [
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
