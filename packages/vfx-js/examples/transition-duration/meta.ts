// VFX-JS example: Duration, and 0 for a cut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Duration, and 0 for a cut",
  summary:
    "duration is how many seconds a run lasts (default 0.6). With duration 0 the run changes the DOM and cuts, with no animation at all. The card cycles 1.2 s, 0 and 0.3 s; the slider sets the duration of the next run.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'duration', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
