// VFX-JS example: run() with content built on the fly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "run() with content built on the fly",
  summary:
    "The box starts with one slide. Each click calls t.run(cb): the callback replaces the box's content with a freshly built slide, and VFX-JS animates from the old content to the new. run() is for content that is not already in the DOM; show() is for slides that are.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'run()', 'Swipe', 'replaceChildren'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'repo/packages/transitions/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
