// observable-plot example: Bin: stacked histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: stacked histogram',
  summary:
    'A fill channel partitions each bin by sex, and rectY stacks the parts implicitly. Plot.stackY around binX gives the identical chart.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'stackY', 'fill', 'z'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
