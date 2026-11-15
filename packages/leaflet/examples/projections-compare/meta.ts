// leaflet example: Projections compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections compared",
  summary:
    "A graticule projected through LonLatProjection, SphericalMercatorProjection and MercatorProjection, each scaled to a world 360 units wide and drawn over the other two. A select picks the highlighted one.",
  section: "Coordinate systems",
  tags: ["LonLatProjection", "SphericalMercatorProjection", "MercatorProjection", "project", "bounds"],
  docs: ["repo/src/geo/projection/LonLatProjection.js", "repo/src/geo/projection/SphericalMercatorProjection.js", "repo/src/geo/projection/MercatorProjection.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
