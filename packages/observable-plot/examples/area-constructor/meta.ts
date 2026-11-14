// observable-plot example: Area: general area constructor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: general area constructor',
  summary:
    'Plot.area takes x1, y1, x2 and y2 directly, for when baseline and topline share neither x nor y. A slider shifts the topline in x.',
  section: 'Mark: Area',
  tags: ['area', 'x1', 'x2', 'y1', 'y2'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
