// deck-gl example: TileLayer zRange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer zRange",
  summary:
    "zRange tells the layer how tall a tile's content is, so tall columns whose footprint is off screen still get their tiles at a high pitch.",
  section: 'Geo layers',
  tags: ["TileLayer","zRange","PolygonLayer","extruded"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
