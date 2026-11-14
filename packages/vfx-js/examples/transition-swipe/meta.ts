// VFX-JS example: Swipe transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swipe transition",
  summary:
    "Swipe moves the old content out and the new one follows it in; mid-way it stretches and blurs along the move. The direction param picks left, right, up or down.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Swipe', 'direction', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/swipe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
