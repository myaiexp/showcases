// VFX-JS example: DistortFade transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DistortFade transition",
  summary:
    "DistortFade warps both pictures with simplex noise that peaks halfway through, while crossfading from one to the other.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'DistortFade', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/distort-fade.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
