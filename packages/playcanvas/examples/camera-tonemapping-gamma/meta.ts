// playcanvas example: Camera tone mapping and gamma
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera tone mapping and gamma",
  summary: "One bright scene rendered by six cameras side by side, each with a different toneMapping (Linear, Filmic, Hejl, ACES, ACES2, Neutral) in its own viewport rect. The full view switches gammaCorrection and changes the light intensity.",
  section: "Components",
  tags: ["toneMapping","gammaCorrection","TONEMAP_ACES","GAMMA_SRGB","rect"],
  docs: ["repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
