// echarts example: Large mode for many bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Large mode for many bars',
  summary:
    'A noisy wave drawn as thousands of bars. Change the bar count, turn large on and off, and move largeThreshold to see when the optimisation applies and how long setOption takes.',
  section: 'Option: series.bar',
  tags: ['bar', 'large', 'largeThreshold'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/large.md', 'repo/contents/en/basics/release-note/5-3-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
