// VFX-JS example: the hueShift preset and its shift uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"hueShift" preset',
  summary:
    'The hueShift preset turns every colour around the colour wheel by shift (0 to 1 is one full turn) and keeps brightness and saturation. The card turns it continuously with a function uniform; the full view has a slider.',
  section: 'Shader presets',
  tags: ['hueShift', 'shader preset', 'uniforms'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
