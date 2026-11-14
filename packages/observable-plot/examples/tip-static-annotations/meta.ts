// observable-plot example: Tip: static annotations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: static annotations',
  summary:
    'Two tips with fixed x and y annotate a chart: an array of strings becomes the title, and anchor and dy place each box.',
  section: 'Mark: Tip',
  tags: ['tip', 'title', 'anchor', 'dy'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
