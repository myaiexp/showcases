// motion example: Settings switches that glide with data-layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Settings switches that glide with data-layout',
  summary: 'Flip a switch and its handle slides across, even though the code only changes justify-content from flex-start to flex-end, a value CSS cannot animate. Tag the handle with data-layout and animateLayout does the gliding.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout', 'justify-content', 'spring'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
