// tanstack-charts example: One fit per series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One fit per series',
  summary:
    'z splits the rows so each series gets its own fit. Three groups with different slopes sit in one scatter; colour comes from the same z field, so each fitted line and band matches its dots.',
  section: 'Linear Regression Marks',
  tags: ['linearRegressionY', 'z', 'dot', 'color'],
  docs: ['repo/docs/reference/marks/regression.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
