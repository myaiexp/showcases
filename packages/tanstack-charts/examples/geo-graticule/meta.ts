// tanstack-charts example: Globe with sphere and graticule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe with sphere and graticule",
  summary:
    "An orthographic globe built from three geoShape layers: a Sphere outline, a dashed graticule and the land. The projection is a callback that reads the final chart bounds, fits the sphere and applies a longitude rotation, so the slider (or the card's timer) turns the globe.",
  section: "Geo Shape Mark",
  tags: ['geoShape', 'projection callback', 'geoOrthographic', 'geoGraticule10', 'Sphere', 'strokeDasharray'],
  docs: ['repo/docs/reference/marks/geo.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
