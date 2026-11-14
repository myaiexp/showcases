// observable-plot example: Scales: shared x and y across marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: shared x and y across marks',
  summary:
    'Two line marks, Google and Apple closing prices, in one plot share the same x and y scales so the lines are directly comparable.',
  section: 'Scales',
  tags: ['lineY', 'ruleY', 'x', 'y'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
