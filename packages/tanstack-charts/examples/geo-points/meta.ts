// tanstack-charts example: Point features sized by value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point features sized by value",
  summary:
    "A second geoShape layer draws ten city Point features over the country layer. Both layers use the same projection descriptor with fit 'sphere', so they line up. r reads each city's size and rScale converts it into a pixel radius.",
  section: "Geo Shape Mark",
  tags: ['tooltip format', 'geoShape', 'Point', 'r', 'rScale', 'fit sphere', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/geo.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
