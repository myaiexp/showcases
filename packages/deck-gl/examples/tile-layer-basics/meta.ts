// deck-gl example: TileLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer basics",
  summary:
    "Every tile is drawn in getTileData on a canvas, then shown by a BitmapLayer from renderSubLayers; hover a tile for its x, y, z index.",
  section: 'Geo layers',
  tags: ["TileLayer","getTileData","renderSubLayers","BitmapLayer","tile.index","TileLayerPickingInfo"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
