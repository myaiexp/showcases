// motion example: Carousel that locks direction inside a scrolling list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Carousel that locks direction inside a scrolling list',
  summary: 'A photo strip that picks the first direction you move and stays on it, so a slightly diagonal swipe slides the photos without wobbling up and down. A badge shows the lock.',
  section: 'Gestures',
  tags: ['drag', 'directionLock', 'onDirectionLock', 'constraints', 'elastic'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
