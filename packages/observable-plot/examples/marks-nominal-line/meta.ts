// observable-plot example: Marks: a line over nominal values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: a line over nominal values',
  summary:
    'lineY of four strings: Plot draws it, but a line between nominal values has no meaning.',
  section: 'Marks',
  tags: ['Plot.lineY', 'shorthand', 'ordinal scale'],
  docs: ['repo/docs/features/marks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
