// observable-plot example: Auto: histogram of one dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: histogram of one dimension',
  summary:
    'With one dimension auto draws a histogram: binned for numbers, grouped for categories. Naming y instead of x flips it horizontal.',
  section: 'Mark: Auto',
  tags: ['auto', 'x', 'y'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/olympians.ts', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
