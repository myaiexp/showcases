// VFX-JS example: Crosszoom transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crosszoom transition",
  summary:
    "Crosszoom crossfades through a zoom blur. Like Zoom it sets overflow: true, so the blur spills outside the box.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Crosszoom', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/crosszoom.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
