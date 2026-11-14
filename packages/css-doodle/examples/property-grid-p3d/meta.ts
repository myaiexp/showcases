// css-doodle example: Grid flag: p3d
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid flag: p3d",
  summary:
    "The p3d flag sets transform-style: preserve-3d on the container, so cells rotated in 3D stay in one space. Twelve circles turn around y and the container turns with @t.",
  section: "Properties",
  tags: ['@grid', 'p3d', '@t', 'preserve-3d'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'pages/css-doodle-com/reference/function-t.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
