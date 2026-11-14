// observable-plot example: Facets: fy interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: fy interval',
  summary:
    'Quantitative data made ordinal for faceting: the fy interval option bins athlete height by 10cm and a boxX shows weights per bin.',
  section: 'Facets',
  tags: ['boxX', 'fy', 'interval', 'tickFormat'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
