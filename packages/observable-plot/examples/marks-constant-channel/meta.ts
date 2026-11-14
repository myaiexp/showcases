// observable-plot example: Marks: a constant channel value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: a constant channel value',
  summary:
    'An area whose y1 is a number: the baseline is the same for every point, and a slider moves it.',
  section: 'Marks',
  tags: ['Plot.area', 'x1', 'y1', 'y2'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
