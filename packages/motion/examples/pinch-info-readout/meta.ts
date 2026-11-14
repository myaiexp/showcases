// motion example: Pinch info readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinch info readout',
  summary: "Pinch or twist a card and watch what pinch reports each frame: the point between the fingers, how far it moved, the scale and the rotation. A switch changes the pivot to the card's centre.",
  section: 'Gestures',
  tags: ['pinch', 'onPinch', 'onComplete', 'origin', 'pan'],
  docs: ['pages/motion-dev/docs/pinch.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
