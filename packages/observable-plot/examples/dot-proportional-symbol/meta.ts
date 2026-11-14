// observable-plot example: Dot: proportional symbols
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: proportional symbols',
  summary:
    'Each day of Apple trading as a dot: daily change on a percent x scale, volume on a log y scale, and the r channel sizing the dot by volume.',
  section: 'Mark: Dot',
  tags: ['dot', 'r', 'log', 'percent', 'ruleX'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
