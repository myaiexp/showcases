// VFX-JS example: Crossfade transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crossfade transition",
  summary:
    "Crossfade is the default transition: a plain mix of the old and the new content. The slide box here runs it with show(); the slider changes the duration of each run.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Crossfade', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/vfx-js/src/transition/crossfade.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
