// observable-plot example: Bin: height and weight heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: height and weight heatmap',
  summary:
    'Plot.bin bins on x and y at once and outputs a count to fill, so a rect mark draws a heatmap of athletes by weight and height.',
  section: 'Transform: Bin',
  tags: ['bin', 'rect', 'fill', 'count', 'scheme'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
