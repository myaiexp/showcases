// VFX-JS example: cancel() and running
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cancel() and running",
  summary:
    "t.running is true while a run is in flight. t.cancel() ends the run at once and shows the live content, which already is the new slide because the DOM changed before the animation. The card starts a long run, cancels it part-way and starts again.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'cancel()', 'running', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
