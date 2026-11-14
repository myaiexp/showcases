// VFX-JS example: overflow: room outside the box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "overflow: room outside the box",
  summary:
    "By default a transition draws only inside the element. overflow gives it room: true for the whole canvas, a number for CSS px on every side. The run's value wins over the container's, and that over the transition's own; Zoom sets overflow: true itself, so the first step leaves it alone.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'overflow', 'Zoom'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'repo/packages/transitions/src/zoom.ts', 'pages/amagi-dev/vfx-js-transitions/custom.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
