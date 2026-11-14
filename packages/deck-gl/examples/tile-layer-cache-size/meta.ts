// deck-gl example: TileLayer maxCacheSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer maxCacheSize",
  summary:
    "The tile cache keeps tiles after they leave the view; a small maxCacheSize makes panning back call getTileData again.",
  section: 'Geo layers',
  tags: ["TileLayer","maxCacheSize","onTileLoad","onTileUnload"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
