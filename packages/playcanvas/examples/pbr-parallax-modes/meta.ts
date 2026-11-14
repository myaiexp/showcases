// PlayCanvas example: Parallax modes and zero level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Parallax modes and zero level",
  summary:
    "A brick wall and sphere with a generated height map, viewed from a swaying camera so the relief shifts. The full view switches PARALLAX_OFFSET and PARALLAX_OCCLUSION and sets heightMapFactor and the zero level heightMapBase.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "heightMap", "parallaxMode", "heightMapFactor", "heightMapBase", "PARALLAX_OFFSET", "PARALLAX_OCCLUSION"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/parallax-mapping.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
