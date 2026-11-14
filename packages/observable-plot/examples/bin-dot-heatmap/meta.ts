// observable-plot example: Bin: dot heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: dot heatmap',
  summary:
    'The bin transform outputs bin centres as x and y, so a dot mark sized by r: count is a heatmap of dots. Adding a stroke channel splits the bins by sex.',
  section: 'Transform: Bin',
  tags: ['bin', 'dot', 'r', 'stroke', 'count'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
