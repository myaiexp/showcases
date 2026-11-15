// leaflet example: Tile bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile bounds",
  summary:
    "A terrain tile layer with a bounds option lies over a dark base. It only loads tiles that overlap the bounds, drawn as an orange rectangle, so the terrain patch ends on tile edges. A select switches between two areas and no bounds, and the caption counts the tiles requested.",
  section: "Tile layers",
  tags: ["TileLayer", "bounds", "LatLngBounds", "Rectangle", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
