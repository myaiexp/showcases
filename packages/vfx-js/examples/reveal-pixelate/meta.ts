// VFX-JS example: the pixelateReveal scroll reveal preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"pixelateReveal" preset',
  summary:
    "A scroll reveal: the picture appears as one big block and sharpens through finer and finer pixel grids while it enters, then coarsens again as it leaves. The card treats its own box as the viewport; the full view scrolls the page.",
  section: 'Shader presets',
  tags: ["pixelateReveal", "scroll reveal", "enterProgress", "leaveProgress"],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'pages/amagi-dev/vfx-js/how-it-works.md',
    'repo/packages/vfx-js/src/constants.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
