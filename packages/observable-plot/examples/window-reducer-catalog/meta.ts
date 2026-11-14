// observable-plot example: Window: more reducers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: more reducers',
  summary:
    'Other window reducers on the daily high: percentiles, sum, deviation, variance, difference, ratio, first, last and a custom function.',
  section: 'Transform: Window',
  tags: ['windowY', 'lineY', 'reduce'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
