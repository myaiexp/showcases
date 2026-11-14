// deck-gl example: H3HexagonLayer highPrecision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3HexagonLayer highPrecision",
  summary:
    "Coarse H3 cells and pentagons differ in shape; highPrecision draws each one true, while false reuses one hexagon for all.",
  section: 'Geo layers',
  tags: ["H3HexagonLayer","highPrecision","pentagons","getHexagon"],
  docs: ["repo/docs/api-reference/geo-layers/h3-hexagon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
