// playcanvas example: Baked AO and lightmap textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Baked AO and lightmap textures",
  summary:
    "A floor lit by textures painted in code: an aoMap multiplies the ambient light under the objects, and a lightMap on the second UV set adds pre-computed light pools. Cards toggle the two in turn; the full view also scales the ambient light.",
  section: "Graphics: Lighting",
  tags: ["aoMap","lightMap","lightMapUv","ambientLight"],
  docs: ["repo/docs/user-manual/graphics/lighting/ambient-occlusion.md","repo/docs/user-manual/graphics/lighting/lightmapping.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
