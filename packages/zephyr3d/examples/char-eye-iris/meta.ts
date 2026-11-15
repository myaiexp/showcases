// zephyr3d example: Eye material: iris refraction, pupil and limbal ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Eye material: iris refraction, pupil and limbal ring',
  summary:
    'One eyeball mesh with normals and tangents, shaded by EyeMaterial from a generated iris texture. Sliders move the iris depth, cornea index of refraction, pupil radius and dilation, limbal ring and cornea highlight while a light circles the eye.',
  section: 'Character Rendering',
  tags: ['EyeMaterial', 'irisTexture', 'irisDepth', 'ior', 'pupilRadius', 'pupilDilation', 'limbalRingWidth', 'limbalRingStrength', 'corneaSpecularStrength'],
  docs: ['repo/apps/doc/web/en/material-eye.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
