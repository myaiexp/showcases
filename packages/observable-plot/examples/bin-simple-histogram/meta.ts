// observable-plot example: Bin: a simple histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: a simple histogram',
  summary:
    'binX groups athlete weights into bins and outputs a count as y; rectY draws one bar per bin and a ruleY marks zero.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'count', 'ruleY'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
