// observable-plot example: Box: an array of numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box: an array of numbers',
  summary:
    'A single boxplot from a plain array, where an outlier shows as a dot; there is no data field, so boxX needs no channels.',
  section: 'Mark: Box',
  tags: ['boxX', 'fill', 'stroke', 'r'],
  docs: ['repo/docs/marks/box.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
