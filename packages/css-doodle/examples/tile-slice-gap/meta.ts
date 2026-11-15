// css-doodle example: One piece per cell with gap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One piece per cell with gap",
  summary:
    "@tile cuts a shape into pieces and gives each cell one as a clip-path, with every cell covering the whole doodle. Twenty-four slices of the default square get their own colour and gap leaves a dark seam between them.",
  section: 'Shapes',
  tags: ['@tile', 'gap', '@grid', '@p'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
