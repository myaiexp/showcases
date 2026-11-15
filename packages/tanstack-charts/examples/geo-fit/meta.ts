// tanstack-charts example: Fitting the projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fitting the projection",
  summary:
    "fit 'data' scales the projection to the shapes passed to the mark, so a dozen European countries fill the plot. fit 'sphere' keeps the full world frame, and a GeoJSON geometry (here a box over southern Africa) fits to exactly that region.",
  section: "Geo Shape Mark",
  tags: ['geoShape', 'fit', 'sphere', 'GeoPermissibleObjects', 'geoMercator'],
  docs: ['repo/docs/reference/marks/geo.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
