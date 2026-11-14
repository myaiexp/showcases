// observable-plot example: A custom composite mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom composite mark',
  summary:
    'Why Plot? defines arealineY, a function that returns Plot.marks(ruleY, areaY, lineY) sharing one set of options, then calls .plot() on it like a built-in mark. Here it charts the Apple close price in a choice of colours.',
  section: 'Introduction',
  tags: ['Plot.marks', 'composite mark', 'areaY', 'lineY', 'ruleY'],
  docs: ['repo/docs/why-plot.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
