// observable-plot example: Bin: one-dimensional heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: one-dimensional heatmap',
  summary:
    'The same weight bins, but the count goes to the fill channel of a plain rect mark, so colour instead of height shows how many athletes are in each bin.',
  section: 'Transform: Bin',
  tags: ['binX', 'rect', 'fill', 'color', 'scheme'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
