// deck-gl example: TerrainLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TerrainLayer basics",
  summary:
    "A height map PNG drawn in code becomes a mesh: elevationData holds the heights, texture drapes a tinted image over it, bounds place it on the map.",
  section: 'Geo layers',
  tags: ["TerrainLayer","elevationData","texture","bounds","elevationDecoder"],
  docs: ["repo/docs/api-reference/geo-layers/terrain-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
