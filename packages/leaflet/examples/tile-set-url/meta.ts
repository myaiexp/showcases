// leaflet example: Changing the URL with setUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Changing the URL with setUrl",
  summary:
    "setUrl() swaps the style in a tile layer's URL template. With noRedraw the old tiles stay until redraw() is called, and setting the same URL again redraws only when noRedraw is false. The log lists each call and the requests it caused.",
  section: "Tile layers",
  tags: ["TileLayer", "setUrl", "redraw", "noRedraw", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
