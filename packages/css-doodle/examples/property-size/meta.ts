// css-doodle example: @size: width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@size: width and height",
  summary:
    "One declaration for width and height: a single value is used for both, two give width and height, and a ratio after auto becomes aspect-ratio. At the top level it sizes each cell, on :doodle it sizes the component.",
  section: "Properties",
  tags: ['@size', 'aspect-ratio', ':doodle'],
  docs: [
    'pages/css-doodle-com/reference/property-size.md',
    'pages/css-doodle-com/reference/property-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
