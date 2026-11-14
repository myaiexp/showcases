// VFX-JS example: rainbow preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"rainbow" preset',
  summary:
    "The rainbow preset recolours the element with a diagonal band of hues that slides across it over time, keeping each pixel's brightness. Here it runs over a text headline.",
  section: 'Shader presets',
  tags: ["rainbow", "shader preset", "text"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
