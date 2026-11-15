// leaflet example: PolyUtil centroid and polygonCenter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PolyUtil centroid and polygonCenter",
  summary:
    "PolyUtil.centroid (the mean of the vertices) against PolyUtil.polygonCenter (the centre of the area) for a rectangle whose south edge gets more vertices: the first moves, the second stays.",
  section: "Geometry & types",
  tags: ["PolyUtil", "centroid", "polygonCenter", "EPSG3857", "Polygon"],
  docs: ['repo/src/geometry/PolyUtil.js', 'repo/src/geo/crs/EPSG3857.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
