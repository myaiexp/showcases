// deck-gl example: TileLayer in an OrthographicView
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer in an OrthographicView",
  summary:
    "Outside a map the tile index counts from the origin: tile x 0, y 0 is the square from [0, 0] to [tileSize, tileSize], and zoom steps double the resolution.",
  section: 'Geo layers',
  tags: ["TileLayer","OrthographicView","tileSize","extent","tile.index"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md","repo/docs/api-reference/core/orthographic-view.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
