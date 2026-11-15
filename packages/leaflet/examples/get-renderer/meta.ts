// leaflet example: Which renderer a path gets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which renderer a path gets",
  summary:
    "map.getRenderer(layer) for three lines: a plain one, one with its own SVG renderer and one in a custom pane, on a map with and without renderer: new Canvas(). The readout names each renderer and whether it is shared.",
  section: "Renderers",
  tags: ["getRenderer", "SVG", "Canvas", "createPane", "renderer"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/Renderer.js", "repo/src/layer/vector/Path.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
