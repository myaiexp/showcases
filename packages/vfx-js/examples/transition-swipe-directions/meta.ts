// VFX-JS example: Swipe in four directions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swipe in four directions",
  summary:
    "One param changes where Swipe sends the content: left (the default), right, up or down. The card cycles through all four; in the full view pick a direction and use Next, or Back for the reverse run, which plays the same move backwards.",
  section: "Transition presets",
  tags: ['Swipe', 'direction', 'reverse', 'vfx.addTransition', 'show()'],
  docs: ['repo/docs/TRANSITION.md', 'repo/packages/transitions/src/swipe.ts', 'pages/amagi-dev/vfx-js-transitions/presets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
