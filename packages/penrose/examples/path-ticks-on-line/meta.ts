// penrose example: ticksOnLine: equal-length marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ticksOnLine: equal-length marks',
  summary:
    '`ticksOnLine(p1, p2, spacing, numTicks, tickLength)` crosses the middle of a segment with `numTicks` short marks spaced `spacing` apart and reaching `tickLength` to each side, the notation for segments of equal length. The tabs show one to four ticks on a new sampled segment.',
  section: 'Computation: Paths & Curves',
  tags: ['ticksOnLine', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
