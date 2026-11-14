// PlayCanvas example: Alpha test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Alpha test",
  summary:
    "Two clusters of crossing leaf cards from the same opacity map: one cut out with alphaTest (opaque pass, no sorting), one blended, where intersecting cards sort wrongly. The full view sets the threshold.",
  section: "Graphics",
  tags: ["StandardMaterial", "alphaTest", "opacityMap", "blendType"],
  docs: ["repo/docs/user-manual/graphics/transparency.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
