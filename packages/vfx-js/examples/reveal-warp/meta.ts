// VFX-JS example: the warpReveal scroll reveal preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"warpReveal" preset',
  summary:
    "A scroll reveal: the picture enters shredded into horizontal lines thrown sideways, which settle into place as enterProgress reaches 1, and it is hidden again after it leaves. The card treats its own box as the viewport; the full view scrolls the page.",
  section: 'Shader presets',
  tags: ["warpReveal", "scroll reveal", "enterProgress", "leaveProgress"],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'pages/amagi-dev/vfx-js/how-it-works.md',
    'repo/packages/vfx-js/src/constants.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
