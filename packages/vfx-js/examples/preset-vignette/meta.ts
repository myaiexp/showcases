// VFX-JS example: the vignette preset and the uniforms it reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"vignette" preset',
  summary:
    'The vignette preset darkens the picture outside a circle: radius sets where the darkening starts, power how quickly it falls off, intensity how dark the corners get. The preset has no defaults for them, so all three are passed as uniforms.',
  section: 'Shader presets',
  tags: ['vignette', 'shader preset', 'uniforms'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
