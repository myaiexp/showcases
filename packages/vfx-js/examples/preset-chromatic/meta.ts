// VFX-JS example: the chromatic preset and the uniforms it reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"chromatic" preset',
  summary:
    'The chromatic preset is lens-style chromatic aberration: outside radius, red, green and blue are magnified by different amounts, so colour fringes grow towards the edges. intensity, radius and power have no defaults and are all passed as uniforms.',
  section: 'Shader presets',
  tags: ['chromatic', 'shader preset', 'uniforms'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
