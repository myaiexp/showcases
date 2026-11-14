// VFX-JS example: invert preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"invert" preset',
  summary:
    "The invert preset flips every colour to its opposite: white becomes black, yellow becomes blue.",
  section: 'Shader presets',
  tags: ["invert", "shader preset"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
