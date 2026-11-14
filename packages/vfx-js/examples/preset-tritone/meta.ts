// VFX-JS example: the tritone preset and its four uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"tritone" preset',
  summary:
    'The tritone preset maps brightness through three colours in turn, and speed rolls the mapping over time so the bands travel through the picture. color1, color2, color3 (vec4) and speed have no defaults; the colour pickers change them live through function uniforms.',
  section: 'Shader presets',
  tags: ['tritone', 'shader preset', 'uniforms'],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
