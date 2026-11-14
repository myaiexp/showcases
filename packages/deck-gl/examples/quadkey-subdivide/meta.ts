// deck-gl example: QuadkeyLayer subdivide on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "QuadkeyLayer subdivide on click",
  summary:
    "Click a cell to replace its quadkey with its four children; the reset button returns to the four level-1 cells.",
  section: 'Geo layers',
  tags: ["QuadkeyLayer","getQuadkey","onClick","pickable"],
  docs: ["repo/docs/api-reference/geo-layers/quadkey-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
