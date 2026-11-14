// VFX-JS example: keepWrapped: stay wrapped between runs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "keepWrapped: stay wrapped between runs",
  summary:
    "A transition wraps the element in a canvas while a run is in flight and unwraps it afterwards. keepWrapped: true keeps it wrapped between runs, which saves the wrap cost on frequent runs. The readout reads the box's parent element: a canvas while wrapped, the scene when not.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'keepWrapped', 'destroy()'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'pages/amagi-dev/vfx-js-transitions/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
