// observable-plot example: Projection: map small multiples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: map small multiples',
  summary:
    'Albers maps faceted by decade: the fx scale interval option bins Walmart opening dates into 10-year facets, each with the same projection.',
  section: 'Projections',
  tags: ['projection', 'albers', 'fx', 'interval', 'geo', 'dot'],
  docs: ['repo/docs/features/projections.md', 'repo/docs/data/walmarts.ts', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
