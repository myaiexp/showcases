// leaflet example: Native zoom limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Native zoom limits",
  summary:
    "A layer with minNativeZoom 3 and maxNativeZoom 5 but maxZoom 9: zooming the map beyond that range keeps requesting tiles of zoom 3 to 5 and scales them. Sliders move both limits, and the caption compares the map zoom with the zoom of the tiles requested.",
  section: "Tile layers",
  tags: ["TileLayer", "minNativeZoom", "maxNativeZoom", "maxZoom", "redraw"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js", "repo/src/layer/tile/TileLayer.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
