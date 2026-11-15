// css-doodle example: Grid border: ß and the border flag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid border: ß and the border flag",
  summary:
    "The ß modifier is a lenient border shorthand: a bare number is pixels, a missing style is solid and a lone colour gets 1px. The border flag draws a plain 1px line, and border:colour picks its colour.",
  section: "Properties",
  tags: ['@grid', 'ß border', 'border flag'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
