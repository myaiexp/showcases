// deck-gl example: TileLayer load callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer load callbacks",
  summary:
    "onTileLoad, onTileError, onTileUnload and onViewportLoad report each stage of a tile's life; some tiles here fail on purpose.",
  section: 'Geo layers',
  tags: ["TileLayer","onTileLoad","onTileError","onTileUnload","onViewportLoad"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
