// l7 example: Raster tile parser options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raster tile parser options",
  summary:
    "The rasterTile parser takes tileSize, zoomOffset, minZoom, maxZoom and extent; the picture tiles are labelled with their z/x/y so each change is visible.",
  section: "Source",
  tags: ["rasterTile","parser","tileSize","zoomOffset","minZoom","maxZoom","extent"],
  docs: ["repo/site/docs/api/source/raster_tile.en.md","repo/site/docs/api/common/source/tile/method.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
