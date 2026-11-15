// zephyr3d example: Debug outputs of the water shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Debug outputs of the water shader",
  summary:
    "water.debugOutput shows intermediate terms of the water: normal, foam, waterDepth, fresnel, reflection, refraction, absorption, scattering, sunScattering, subsurface, shadow, specular and depth.",
  section: "Environment",
  tags: ['debugOutput', 'WaterDebugOutput', 'wireframe', 'Water'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
