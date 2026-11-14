// VFX-JS example: Zoom transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Zoom transition",
  summary:
    "Zoom grows the old content out of the box while the new one grows from its center. The preset sets overflow: true, so it draws outside the box (here, up to the edge of the stage).",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Zoom', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/zoom.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
