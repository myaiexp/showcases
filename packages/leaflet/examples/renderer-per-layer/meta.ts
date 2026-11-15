// leaflet example: Renderer per layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer per layer",
  summary:
    "Paths given their own renderer option: two lines on an SVG renderer and two on a Canvas renderer, on one map. getElement() returns a <path> for the SVG lines and undefined for the canvas ones.",
  section: "Renderers",
  tags: ["SVG", "Canvas", "renderer", "getElement", "getRenderer"],
  docs: ["repo/src/layer/vector/Renderer.js", "repo/src/layer/vector/Path.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
