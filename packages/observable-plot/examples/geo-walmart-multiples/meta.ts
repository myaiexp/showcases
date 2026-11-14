// observable-plot example: Geo: map small multiples by decade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo: map small multiples by decade',
  summary:
    'Walmart store openings as point geometries in one map per decade, faceted by fy with a 10 years interval. axisFy labels each decade and r sizes the points.',
  section: 'Mark: Geo',
  tags: ['geo', 'fy', 'interval', 'axisFy', 'albers'],
  docs: ['repo/docs/marks/geo.md', 'repo/docs/data/walmarts.ts', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
