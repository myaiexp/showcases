// observable-plot example: Projection: reuse a materialized projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: reuse a materialized projection',
  summary:
    'plot.scale("projection") returns the projection a plot used; passing it as the projection option of a second plot reuses the same mapping.',
  section: 'Projections',
  tags: ['projection', 'plot.scale', 'geo', 'graticule'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
