// deck-gl example: QuadkeyLayer levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "QuadkeyLayer levels",
  summary:
    "Points counted into quadkey cells: the key length is the zoom level, and each extra digit splits a cell in four.",
  section: 'Geo layers',
  tags: ["QuadkeyLayer","getQuadkey","getFillColor"],
  docs: ["repo/docs/api-reference/geo-layers/quadkey-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
