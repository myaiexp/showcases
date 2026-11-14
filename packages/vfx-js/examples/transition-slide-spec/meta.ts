// VFX-JS example: slideSpec: how each slide enters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "slideSpec: how each slide enters",
  summary:
    "slideSpec is a function from the entering slide to a spec (or undefined). Its fields go over the container's, and the options of show() go over it. Here Dusk enters with Swipe (the container's), Night with Zoom, and Meadow with Glitch; the checkbox passes a Crossfade in show(), which wins.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'slideSpec', 'Zoom', 'Glitch'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
