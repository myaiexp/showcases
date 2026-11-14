// VFX-JS example: Datamosh transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Datamosh transition",
  summary:
    "Datamosh hard-cuts to the new content, but the old picture smears on in motion blocks that heal block by block. blockSize is the size of those blocks in px.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Datamosh', 'blockSize', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/datamosh.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
