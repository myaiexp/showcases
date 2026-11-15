// leaflet example: Failed tiles and errorTileUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Failed tiles and errorTileUrl",
  summary:
    "A select chooses where tiles come from: a working server, one that is down, or zoom 19, where the server has no tiles. A toggle sets errorTileUrl to a drawn stand-in image. The tileerror event fires either way and the log counts the failed tiles.",
  section: "Tile layers",
  tags: ["TileLayer", "errorTileUrl", "tileerror", "maxZoom"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
