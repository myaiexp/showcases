// VFX-JS example: Different sizes are not animated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Different sizes are not animated",
  summary:
    "When the new content changes the box's size, VFX-JS locks the box at its old size for the run and lets it jump to the new size afterwards; the transition only mixes pixels of one shared box. The box here has a fixed width and a height that follows its content, so it jumps at the end of each run.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'run()', 'sizing', 'limits', 'Crossfade'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'pages/amagi-dev/vfx-js-transitions/limitations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
