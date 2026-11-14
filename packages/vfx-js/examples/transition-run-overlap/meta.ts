// VFX-JS example: A new run during a run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A new run during a run",
  summary:
    "A new run() while one is in flight drops the old run: the old promise resolves, and its callback still runs, so no DOM change is lost. Three runs start 250 ms apart; the log shows every callback executing and the final content being the third. Only the last one animates to the end.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'run()', 'Swipe', 'cancel()'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
