// tanstack-charts example: Squarify ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Squarify ratio",
  summary:
    "ratio is the aspect ratio the squarify method aims for. 1 asks for squares, larger values accept wider tiles and change which tiles sit in each row. The round option snaps rectangle edges to whole pixels.",
  section: "Treemap Mark",
  tags: ['treemap', 'ratio', 'round', 'squarify'],
  docs: ['repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
