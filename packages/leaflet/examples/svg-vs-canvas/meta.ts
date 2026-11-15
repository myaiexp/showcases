// leaflet example: SVG or Canvas renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG or Canvas renderer",
  summary:
    "The same 250 circle markers drawn by the map's renderer option set to new SVG() and new Canvas(). The caption counts the <path> and <canvas> elements each one leaves in the overlay pane.",
  section: "Renderers",
  tags: ["SVG", "Canvas", "renderer", "CircleMarker"],
  docs: ["repo/src/layer/vector/Renderer.js", "repo/src/layer/vector/SVG.js", "repo/src/layer/vector/Canvas.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
