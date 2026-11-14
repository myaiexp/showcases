// observable-plot example: Line: ordinal x positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: ordinal x positions',
  summary:
    'Each US state is a line across age groups, an ordinal x scale with an explicit domain. normalizeY with the sum reducer turns counts into the share of the state population, shown as a percent.',
  section: 'Mark: Line',
  tags: ['line', 'normalizeY', 'ordinal', 'domain', 'percent', 'z', 'labelArrow'],
  docs: ['repo/docs/marks/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
