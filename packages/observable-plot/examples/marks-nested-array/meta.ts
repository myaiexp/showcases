// observable-plot example: Marks: a nested array of marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: a nested array of marks',
  summary:
    'Array.map builds one line mark per stock, and the inner array goes straight into marks.',
  section: 'Marks',
  tags: ['Plot.lineY', 'marks', 'Array.map'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
