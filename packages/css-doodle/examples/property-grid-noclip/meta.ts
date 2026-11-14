// css-doodle example: Grid flag: noclip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid flag: noclip",
  summary:
    "By default the component clips what overflows it. With noclip (contain: none) a cell drifting past the edge stays visible; the doodle on the right has no flag.",
  section: "Properties",
  tags: ['@grid', 'noclip', 'contain'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
