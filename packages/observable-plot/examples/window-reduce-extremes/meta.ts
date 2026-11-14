// observable-plot example: Window: rolling min, max and median
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: rolling min, max and median',
  summary:
    'The reduce option picks the summary: min, max and median over a 28-day window of the daily low.',
  section: 'Transform: Window',
  tags: ['windowY', 'lineY', 'reduce'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
