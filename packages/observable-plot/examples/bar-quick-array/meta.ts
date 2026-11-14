// observable-plot example: Bar: an array of numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: an array of numbers',
  summary:
    'With no options, barY or barX draws the array as a quick sequential bar chart, index on the ordinal axis; rx rounds the corners.',
  section: 'Mark: Bar',
  tags: ['barY', 'barX', 'rx', 'inset'],
  docs: ['repo/docs/marks/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
