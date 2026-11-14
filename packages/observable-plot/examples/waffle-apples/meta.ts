// observable-plot example: Waffle: cells per row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle: cells per row',
  summary:
    'A single horizontal waffleX of apples. The number of rows is chosen so cells stay square; the multiple option fixes it instead, and the band padding biases the automatic choice.',
  section: 'Mark: Waffle',
  tags: ['waffleX', 'multiple', 'padding', 'gap'],
  docs: ['repo/docs/marks/waffle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
