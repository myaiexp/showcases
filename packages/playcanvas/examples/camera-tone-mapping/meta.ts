// playcanvas example: Tone mapping and gamma
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tone mapping and gamma",
  summary:
    "Six cameras share one HDR scene, each in its own viewport with a different tone mapping curve: linear, filmic, hejl, ACES, ACES2 and neutral. The full view switches gammaCorrection between GAMMA_SRGB and GAMMA_NONE and changes the sun intensity.",
  section: "Graphics: Cameras",
  tags: ["toneMapping","TONEMAP_ACES","TONEMAP_NEUTRAL","gammaCorrection","GAMMA_NONE","rect"],
  docs: ["repo/docs/user-manual/graphics/cameras/tone-mapping.md","repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
