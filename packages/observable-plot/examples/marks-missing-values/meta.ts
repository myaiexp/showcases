// observable-plot example: Marks: missing and invalid values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: missing and invalid values',
  summary:
    'A wave with null, undefined and NaN values: the line breaks at the gaps and dots with a zero radius are dropped.',
  section: 'Marks',
  tags: ['Plot.lineY', 'Plot.dot', 'r', 'missing data'],
  docs: ['repo/docs/features/marks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
