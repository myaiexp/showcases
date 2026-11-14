// css-doodle example: The grid attribute against the @grid property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The grid attribute against the @grid property",
  summary:
    "Two doodles carry grid=\"2\" and the same cell rules. The left one has no @grid, so it is two by two; the right one writes @grid: 5x5 / 100% in its code, and when both are present the property wins.",
  section: "Attributes",
  tags: ['grid', '@grid', '@pn'],
  docs: [
    'pages/css-doodle-com/reference/attribute-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
