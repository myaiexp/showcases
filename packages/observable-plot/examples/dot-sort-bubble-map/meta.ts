// observable-plot example: Dot: sort option on a bubble map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: sort option on a bubble map',
  summary:
    'County populations as bubbles on an albers-usa map through geoCentroid. By default big dots are drawn first so small ones stay visible; sort: null draws in input order.',
  section: 'Mark: Dot',
  tags: ['dot', 'geoCentroid', 'geo', 'sort', 'projection', 'r'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/marks/geo.md', 'repo/docs/transforms/centroid.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
