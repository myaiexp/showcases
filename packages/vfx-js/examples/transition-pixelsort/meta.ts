// VFX-JS example: Pixelsort transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pixelsort transition",
  summary:
    "Pixelsort melts the old content into sorted streaks, cuts at halfway and sorts the new content back out of them from the opposite side. direction is where the old content melts.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Pixelsort', 'direction', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/pixelsort.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
