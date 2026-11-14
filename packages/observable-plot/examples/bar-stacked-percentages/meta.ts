// observable-plot example: Bar: one-dimensional proportions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: one-dimensional proportions',
  summary:
    'An explicit stackX transform lays the alphabet frequencies end to end in one bar, with textX labels stacked the same way, on a percent scale.',
  section: 'Mark: Bar',
  tags: ['barX', 'textX', 'stackX', 'percent', 'ruleX'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
