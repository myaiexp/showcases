// observable-plot example: Bin: horizontal histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: horizontal histogram',
  summary:
    'binY bins on y and outputs x, and rectX draws horizontal bars: the same weight distribution turned on its side.',
  section: 'Transform: Bin',
  tags: ['binY', 'rectX', 'count', 'ruleX'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
