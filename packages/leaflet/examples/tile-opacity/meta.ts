// leaflet example: Tile layer opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile layer opacity",
  summary:
    "A light layer lies over a dark one, with its opacity set by the opacity option at the start and by setOpacity() from a slider. The card fades it in and out.",
  section: "Tile layers",
  tags: ["GridLayer", "opacity", "setOpacity", "TileLayer"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/GridLayer.js', 'repo/src/layer/LayerBase.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
