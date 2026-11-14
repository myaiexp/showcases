// observable-plot example: Line: interval option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: interval option',
  summary:
    'lineY with an interval bins the samples by day, week or month and reduces each bin. With day, weekends hold no trade and the line breaks; with sum the value of an empty bin is zero instead of a gap.',
  section: 'Mark: Line',
  tags: ['lineY', 'interval', 'reduce', 'binX', 'marker'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
