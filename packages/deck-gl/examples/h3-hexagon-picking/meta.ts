// deck-gl example: H3HexagonLayer picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3HexagonLayer picking",
  summary:
    "Hover a cell to see its H3 index, click to read its parent, centre and neighbours with h3-js.",
  section: 'Geo layers',
  tags: ["H3HexagonLayer","pickable","autoHighlight","onClick"],
  docs: ["repo/docs/api-reference/geo-layers/h3-hexagon-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
