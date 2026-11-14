// observable-plot example: Bin: cumulative distribution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: cumulative distribution',
  summary:
    'The cumulative option makes each bin count the athletes at that weight or less (1) or at that weight or more (-1).',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'cumulative'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
