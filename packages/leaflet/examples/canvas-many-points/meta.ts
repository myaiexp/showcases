// leaflet example: Thousands of points on a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Thousands of points on a canvas",
  summary:
    "Up to 20,000 CircleMarkers on one Canvas renderer, chosen with a slider. The caption gives the time to add them and the number of <path> elements (none). Hovered dots highlight through the layers' own pointer events.",
  section: "Renderers",
  tags: ["Canvas", "CircleMarker", "LayerGroup", "clearLayers", "pointerover"],
  docs: [
    'repo/src/layer/vector/Canvas.js',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/layer/LayerGroup.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
