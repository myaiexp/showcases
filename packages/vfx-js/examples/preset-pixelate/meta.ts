// VFX-JS example: pixelate preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"pixelate" preset',
  summary:
    "The pixelate preset snaps the picture to a grid of blocks whose count swings between 16 and 80 across over time, from coarse to nearly sharp.",
  section: 'Shader presets',
  tags: ["pixelate", "shader preset"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
