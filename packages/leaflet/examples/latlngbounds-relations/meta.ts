// leaflet example: LatLngBounds contains, intersects, overlaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLngBounds contains, intersects, overlaps",
  summary:
    "A fixed LatLngBounds and a moving one: contains, intersects and overlaps are read as the second box slides from inside, to overlapping, to touching an edge (intersects true, overlaps false), to apart.",
  section: "Geometry & types",
  tags: ["LatLngBounds", "contains", "intersects", "overlaps", "Rectangle"],
  docs: ['repo/src/geo/LatLngBounds.js', 'repo/src/layer/vector/Rectangle.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
