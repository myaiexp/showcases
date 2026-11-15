// tanstack-charts example: Tiling methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiling methods",
  summary:
    "The method option picks how rectangles are packed: squarify aims for square-ish tiles, binary balances halves, dice and slice cut in one direction, and slice-dice alternates by depth. The data stays the same.",
  section: "Treemap Mark",
  tags: ['treemap', 'method', 'squarify', 'binary', 'dice', 'slice'],
  docs: ['repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
