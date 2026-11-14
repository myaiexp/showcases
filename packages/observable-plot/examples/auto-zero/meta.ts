// observable-plot example: Auto: zero option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: zero option',
  summary:
    'The zero option on y says zero is meaningful: auto adds a rule at 0 and keeps it in the scale domain.',
  section: 'Mark: Auto',
  tags: ['auto', 'zero'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
