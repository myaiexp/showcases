// observable-plot example: Bar: letter frequencies, sorted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: letter frequencies, sorted',
  summary:
    'barY draws one bar per letter, with an implicit stackY from zero; the sort option on x orders the bars by descending y instead of alphabetically.',
  section: 'Mark: Bar',
  tags: ['barY', 'sort', 'stackY'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
