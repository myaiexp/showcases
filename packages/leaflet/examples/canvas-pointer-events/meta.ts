// leaflet example: Events on canvas-drawn paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events on canvas-drawn paths",
  summary:
    "The canvas of a Canvas renderer has pointer-events: none. A click on a circle reaches the layer's and the map's listeners, while a listener added to the <canvas> element counts nothing.",
  section: "Renderers",
  tags: ["Canvas", "CircleMarker", "click", "pointer-events"],
  docs: ["repo/MIGRATION.md", "repo/src/layer/vector/Canvas.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
