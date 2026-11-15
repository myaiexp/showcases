// leaflet example: Bounds across the antimeridian
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds across the antimeridian",
  summary:
    "Two LatLngBounds meant to cover 170E to 170W: corners at 170 and 190 give the box across the antimeridian, corners at 170 and -170 give the long way round. contains() on two points shows the difference.",
  section: "Geometry & types",
  tags: ["LatLngBounds", "contains", "worldCopyJump", "Rectangle"],
  docs: ['repo/src/geo/LatLngBounds.js', 'repo/src/map/Map.js', 'repo/src/layer/vector/Rectangle.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
