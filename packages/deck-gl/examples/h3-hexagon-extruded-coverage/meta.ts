// deck-gl example: H3HexagonLayer extruded and coverage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3HexagonLayer extruded and coverage",
  summary:
    "extruded raises each cell by getElevation; coverage between 0 and 1 shrinks the hexagons to leave gaps.",
  section: 'Geo layers',
  tags: ["H3HexagonLayer","extruded","coverage","getElevation","elevationScale"],
  docs: ["repo/docs/api-reference/geo-layers/h3-hexagon-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
