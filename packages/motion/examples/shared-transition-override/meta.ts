// motion example: Sort picker with its own pill timing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort picker with its own pill timing',
  summary: 'A segmented "Sort by" control whose highlight pill bounces between options while the list underneath re-orders with a quick, plain slide. One animateLayout call, two different feels, because .shared() gives the pill its own transition.',
  section: 'animateLayout',
  tags: ['animateLayout', 'shared', 'data-layout-id', 'transition'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
