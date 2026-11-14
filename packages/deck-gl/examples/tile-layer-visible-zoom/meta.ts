// deck-gl example: TileLayer visibleMinZoom and visibleMaxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer visibleMinZoom and visibleMaxZoom",
  summary:
    "Fetching and showing are separate: tiles load for minZoom to maxZoom, but only show between visibleMinZoom and visibleMaxZoom.",
  section: 'Geo layers',
  tags: ["TileLayer","visibleMinZoom","visibleMaxZoom","onTileLoad"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
