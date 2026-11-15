// zephyr3d example: Underwater: medium, ambient light and god rays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Underwater: medium, ambient light and god rays",
  summary:
    "Moving the camera below y = 0 puts it in the water medium: underwaterEnabled, underwaterAmbientIntensity, underwaterGodRays with intensity, step count and shadowing. Drag the camera height through the surface.",
  section: "Environment",
  tags: ['underwaterEnabled', 'underwaterAmbientIntensity', 'underwaterGodRays', 'underwaterGodRayIntensity', 'underwaterGodRaySteps', 'underwaterGodRayShadow'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
