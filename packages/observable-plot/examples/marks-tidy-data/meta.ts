// observable-plot example: Marks: tidy data and shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: tidy data and shapes',
  summary:
    'One dot per row, one polyline for the whole series, or one polyline per series through the z channel.',
  section: 'Marks',
  tags: ['Plot.dot', 'Plot.lineY', 'z'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
