// PlayCanvas example: HDR versus LDR environment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HDR versus LDR environment",
  summary:
    "The same generated sky as a half-float HDR atlas (sun at 40) and clamped to 1.0, each lighting a mirror and a glossy metal sphere. The HDR sun reflects as a hot spot; the clamped one carries no more light than the sky.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "envAtlas", "EnvLighting", "exposure", "PIXELFORMAT_RGBA16F"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/image-based-lighting.md", "repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
