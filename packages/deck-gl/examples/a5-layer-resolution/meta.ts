// deck-gl example: A5Layer resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A5Layer resolution",
  summary:
    "Points counted into A5 pentagon cells: getPentagon returns the 64-bit cell id, and the resolution slider changes the cell size.",
  section: 'Geo layers',
  tags: ["A5Layer","getPentagon","a5-js","lonLatToCell"],
  docs: ["repo/docs/api-reference/geo-layers/a5-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
