// leaflet example: Layer minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer minZoom and maxZoom",
  summary:
    "Two tile layers share one map: a vintage layer with maxZoom 4 and a night layer with minZoom 5. Zooming across 4 and 5 hands over from one to the other. A slider sets the zoom and the caption names the layer in use.",
  section: "Tile layers",
  tags: ["TileLayer", "minZoom", "maxZoom"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/GridLayer.js', 'repo/src/layer/tile/TileLayer.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
