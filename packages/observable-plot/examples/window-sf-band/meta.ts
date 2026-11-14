// observable-plot example: Window: rolling mean band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: rolling mean band',
  summary:
    'The daily high and low in San Francisco with rolling-mean lines. The k option sets how many days each average covers.',
  section: 'Transform: Window',
  tags: ['windowY', 'lineY', 'areaY', 'k'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
