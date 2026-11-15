// leaflet example: TMS rows and {-y}
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TMS rows and {-y}",
  summary:
    "A tile server that counts rows from the bottom, used three ways: tms: true, {-y} in the URL, and neither. The first two draw the world correctly; the last asks for the wrong rows and the continents come back mirrored. The log shows each URL beside the XYZ row Leaflet computed.",
  section: "Tile layers",
  tags: ["TileLayer", "tms", "{-y}", "requestUrl", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/docs/examples/wms/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
