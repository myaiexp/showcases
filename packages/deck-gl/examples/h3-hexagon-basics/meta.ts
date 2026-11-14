// deck-gl example: H3HexagonLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3HexagonLayer basics",
  summary:
    "Points counted into H3 cells at a chosen resolution, drawn from the cell index alone: getHexagon returns the id, the layer finds the shape.",
  section: 'Geo layers',
  tags: ["H3HexagonLayer","getHexagon","getFillColor","h3-js"],
  docs: ["repo/docs/api-reference/geo-layers/h3-hexagon-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
