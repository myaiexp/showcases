// leaflet example: Canvas renderer for the whole map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas renderer for the whole map",
  summary:
    "A map with renderer: new Canvas(): a polyline, a polygon and a circle marker are pixels on one canvas, yet each fires pointerover, pointerout and click, found by the map itself.",
  section: "Renderers",
  tags: ["Canvas", "renderer", "pointerover", "pointerout", "setStyle"],
  docs: [
    'repo/src/layer/vector/Canvas.js',
    'repo/MIGRATION.md',
    'repo/src/map/Map.js',
    'repo/src/layer/GeoJSON.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
