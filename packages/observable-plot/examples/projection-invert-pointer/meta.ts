// observable-plot example: Projection: invert a pointer position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: invert a pointer position',
  summary:
    'The materialized projection supports invert: moving the pointer over an Equal Earth map reads back longitude and latitude, drawn over the plot.',
  section: 'Projections',
  tags: ['projection', 'plot.scale', 'invert', 'equal-earth'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
