// l7 example: Tile source tileset and reload methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile source tileset and reload methods",
  summary:
    "tileset reports isLoaded, currentTiles and currentZoom and emits tiles-load-start and finished; reloadAllTile, reloadTilebyId, reloadTileByExtent and reloadTileByLnglat re-request tiles after the server's data changes.",
  section: "Source",
  tags: ["tileset","reloadAllTile","reloadTilebyId","reloadTileByExtent","reloadTileByLnglat","tiles-load-start","tiles-load-finished"],
  docs: ["repo/site/docs/api/common/source/tile/method.en.md","repo/site/docs/api/source/mvt.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
