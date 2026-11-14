// a tab panel whose slides change through show() and the Swipe preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tab panel with show()',
  summary:
    'vfx.addTransition(panel) returns a handle at once. The panel\'s sections are the slides: show(i) hides the others and plays the Swipe transition from the old slide to the new one. The box has a fixed size, so old and new content share it.',
  section: 'Transitions',
  tags: ['vfx.addTransition', 'show()', 'Swipe', 'slides', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'repo/packages/transitions/README.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
