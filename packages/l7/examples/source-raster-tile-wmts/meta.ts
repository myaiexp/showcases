// l7 example: Raster tile parser wmtsOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raster tile parser wmtsOptions",
  summary:
    "wmtsOptions (layer, tileMatrixset, format) makes L7 build a WMTS GetTile request from the base url; the last request is printed.",
  section: "Source",
  tags: ["rasterTile","wmtsOptions","tileMatrixset","WMTS"],
  docs: ["repo/site/docs/api/source/raster_tile.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
