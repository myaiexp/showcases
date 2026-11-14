// PlayCanvas example: Parallax samples and self shadowing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Parallax samples and self shadowing",
  summary:
    "Occlusion parallax on a brick wall with a directional light sweeping across it, so raised bricks shadow the mortar. The full view sets parallaxSamples, parallaxShadowSamples and the relief depth.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "parallaxMode", "parallaxSamples", "parallaxShadowSamples", "heightMapFactor", "PARALLAX_OCCLUSION"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/parallax-mapping.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
