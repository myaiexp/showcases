// observable-plot example: Area: unsorted data and sort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: unsorted data and sort',
  summary:
    'Area points join in input order, so shuffled rows make a scribble. The sort option on the date channel puts them back in order.',
  section: 'Mark: Area',
  tags: ['areaY', 'sort'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
