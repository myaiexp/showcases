// leaflet example: detectRetina
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "detectRetina",
  summary:
    "detectRetina on a tile layer built while Leaflet sees a device pixel ratio of 1, 1.5, 2 or 3 (the example sets it for the one constructor call and restores it). From 1.5 up the layer halves its tileSize and adds 1 to zoomOffset, so four half-size tiles one zoom deeper replace each tile; the side panel shows the resulting options.",
  section: "Tile layers",
  tags: ["TileLayer", "detectRetina", "tileSize", "zoomOffset", "maxZoom"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
