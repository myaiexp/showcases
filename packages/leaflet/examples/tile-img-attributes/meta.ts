// leaflet example: crossOrigin and referrerPolicy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "crossOrigin and referrerPolicy",
  summary:
    "crossOrigin and referrerPolicy as selects: Leaflet sets them on each tile's <img>, and the side panel prints the attributes of the first tile. The default referrerPolicy is strict-origin-when-cross-origin; false leaves the attribute off.",
  section: "Tile layers",
  tags: ["TileLayer", "crossOrigin", "referrerPolicy", "tileloadstart"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
