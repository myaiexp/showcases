// motion example: Two panels, only one animates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two panels, only one animates',
  summary: 'Two identical widgets change in the same instant, but only the one you scope the animation to glides; the other just snaps. Useful when a page has many animated areas and one change should not set them all off.',
  section: 'animateLayout',
  tags: ['animateLayout', 'scope', 'selector', 'element list'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
