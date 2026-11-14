// tanstack-charts example: Bars need a zero baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bars need a zero baseline',
  summary:
    'Four scores between 92 and 97. With a zero baseline the bars look similar; a domain of 90 to 100 makes the last bar look five times the first.',
  section: 'Choosing a Chart',
  tags: ['barY', 'scaleLinear', 'domain'],
  docs: ['repo/docs/guides/choosing-a-chart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
