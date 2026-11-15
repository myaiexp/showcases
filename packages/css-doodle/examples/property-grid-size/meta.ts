// css-doodle example: Grid size: / width height and auto ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid size: / width height and auto ratio",
  summary:
    "The first slash in @grid sets the width and height of the whole component. When one of the two is auto the component gets an aspect-ratio from its columns and rows, or from a ratio in parentheses.",
  section: "Properties",
  tags: ['@grid', '/ size', 'auto', 'aspect-ratio'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'pages/css-doodle-com/reference/property-size.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
