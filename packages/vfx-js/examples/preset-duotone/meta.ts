// VFX-JS example: the duotone preset and the uniforms it reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"duotone" preset',
  summary:
    'The duotone preset maps each pixel\'s brightness to a blend of two colours, and speed slides that mapping over time. It reads color1, color2 (vec4) and speed from uniforms and has no defaults, so all three are passed, here on a playing video as in the docs.',
  section: 'Shader presets',
  tags: ['duotone', 'shader preset', 'uniforms', 'video'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
