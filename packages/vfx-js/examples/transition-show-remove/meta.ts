// VFX-JS example: show() with remove: true
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "show() with remove: true",
  summary:
    "show(slide, { remove: true }) takes the other slides out of the DOM instead of hiding them. A slide that is not in the container is appended first, so the example keeps its own list and shows each element by reference. The readout counts the box's children.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'remove', 'SlideRef', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
