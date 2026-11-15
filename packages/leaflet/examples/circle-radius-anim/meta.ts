// leaflet example: Circle radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle radius",
  summary:
    "A Circle's radius animated with setRadius, in meters. A dashed Rectangle follows the circle's getBounds().",
  section: "Vector layers",
  tags: ["Circle", "setRadius", "getBounds"],
  docs: [
    'repo/src/layer/vector/Circle.js',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/map/Map.js',
    'repo/src/layer/vector/Rectangle.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
