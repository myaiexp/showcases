// VFX-JS example: Glitch transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Glitch transition",
  summary:
    "Glitch shifts blocks of the picture with an RGB split, jumping from step to step; the content swaps halfway. amount scales the block shift and speed sets how fast the blocks jump.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Glitch', 'amount', 'speed', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/glitch.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
