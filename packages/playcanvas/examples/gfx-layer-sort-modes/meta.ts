// PlayCanvas example: Layer sort modes and draw buckets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer sort modes and draw buckets",
  summary:
    "Five translucent cards stacked in depth, seen from every side while the World layer's transparentSortMode cycles through the five modes. The full view sets a card's drawBucket and drawOrder.",
  section: "Graphics",
  tags: ["Layer", "transparentSortMode", "SORTMODE_BACK2FRONT", "SORTMODE_MANUAL", "SORTMODE_NONE", "MeshInstance", "drawBucket", "drawOrder"],
  docs: ["repo/docs/user-manual/graphics/layers/index.md", "repo/docs/user-manual/graphics/transparency.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
