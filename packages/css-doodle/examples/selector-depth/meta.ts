// css-doodle example: @depth: cells at a depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@depth: cells at a depth",
  summary:
    "On a 1x1x8 chain each cell holds the next, so @depth(even) recolours every second ring. @z is an alias, and not inverts.",
  section: "Selectors",
  tags: ['@depth', '@z', 'grid depth', 'not'],
  docs: [
    'pages/css-doodle-com/reference/selector-depth.md',
    'pages/css-doodle-com/reference/attribute-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
