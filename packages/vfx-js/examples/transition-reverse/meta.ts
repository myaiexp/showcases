// VFX-JS example: reverse: play it backwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse: play it backwards",
  summary:
    "reverse: true swaps the roles of the old and new content and plays the animation backwards, so Swipe moves the other way. The transition itself is written once, forward only. The card alternates normal and reversed runs.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'reverse', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'pages/amagi-dev/vfx-js-transitions/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
