// observable-plot example: Dot: one-dimensional area chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: one-dimensional area chart',
  summary:
    'English letter frequency as dots with only an x (or only a y) position, and r carrying the frequency as dot area: a compact alternative to bars.',
  section: 'Mark: Dot',
  tags: ['dot', 'r', 'ordinal'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
