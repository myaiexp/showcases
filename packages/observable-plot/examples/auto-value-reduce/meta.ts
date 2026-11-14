// observable-plot example: Auto: value and reduce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: value and reduce',
  summary:
    'A channel given as {value, reduce}: here average athlete height over birth date, per sex, with a reducer selector.',
  section: 'Mark: Auto',
  tags: ['auto', 'reduce', 'value', 'color'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
