// leaflet example: Renderer padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer padding",
  summary:
    "A Canvas renderer's padding option sets how far past the view the canvas extends. A select rebuilds the map with padding 0 to 1 and reports the canvas size; a pan shows shapes popping in when the padding is small.",
  section: "Renderers",
  tags: ["Canvas", "padding", "panBy", "CircleMarker"],
  docs: [
    'repo/src/layer/vector/Renderer.js',
    'repo/src/layer/BlanketOverlay.js',
    'repo/src/layer/vector/Canvas.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
