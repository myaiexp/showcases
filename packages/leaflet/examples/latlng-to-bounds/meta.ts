// leaflet example: LatLng toBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLng toBounds",
  summary:
    "LatLng.toBounds(600000) at 5, 40 and 65 degrees north: the same size in metres gives a box that spans more degrees of longitude further north. The card flies to each box.",
  section: "Geometry & types",
  tags: ["LatLng", "toBounds", "LatLngBounds", "Rectangle", "flyToBounds"],
  docs: [
    'repo/src/geo/LatLng.js',
    'repo/src/geo/LatLngBounds.js',
    'repo/src/layer/vector/Rectangle.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
