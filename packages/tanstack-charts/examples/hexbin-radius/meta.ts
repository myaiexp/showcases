// tanstack-charts example: Hexagon size from a channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagon size from a channel",
  summary:
    "r can be a channel instead of a number. Here it reads each bin's count through a square-root scale, so dense bins fill their cell and sparse ones shrink, while color shows a second output, the mean cylinder count.",
  section: "Hexbin Mark",
  tags: ['tooltip format', 'hexbin', 'r', 'rScale', 'outputs', 'scaleSqrt'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/hexbin.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
