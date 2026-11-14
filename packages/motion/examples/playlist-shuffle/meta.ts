// motion example: Playlist that shuffles with spring glides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playlist that shuffles with spring glides',
  summary: 'Shuffle, sort or bump a song to the top and every track glides to its new place instead of teleporting. The code just re-appends the rows in a new order; data-layout and a spring do the movement.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout', 'spring', 'reorder'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
