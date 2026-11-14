// motion example: Replay a layout change in slow motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Replay a layout change in slow motion',
  summary: 'A photo strip that switches between a row and a stack, with a scrubber under it. The layout animation is paused the moment it starts, so you can drag through it frame by frame, play it, or slow it down to see exactly how each photo travels.',
  section: 'animateLayout',
  tags: ['animateLayout', 'controls', 'pause', 'time', 'speed'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
