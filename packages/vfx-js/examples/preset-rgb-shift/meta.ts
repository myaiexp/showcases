// VFX-JS example: rgbShift preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"rgbShift" preset',
  summary:
    "The rgbShift preset pulls the three colour channels sideways by a few pixels along wavy bands that move over time, a soft analogue misregistration.",
  section: 'Shader presets',
  tags: ["rgbShift", "shader preset"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
