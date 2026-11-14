// observable-plot example: Line: sorting unordered data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: sorting unordered data',
  summary:
    'Shuffled Apple prices join up in input order and scribble across the plot. The sort option on the mark puts them back in date order.',
  section: 'Mark: Line',
  tags: ['lineY', 'sort', 'shuffle'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
