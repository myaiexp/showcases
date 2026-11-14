// motion example: Tabs with an underline that slides between them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tabs with an underline that slides between them',
  summary: 'The active-tab marker the way settings pages do it: one underline that slides from tab to tab. The code removes the underline from one tab and adds a new one to the next; matching data-layout-id makes Motion treat them as the same element.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout-id', 'shared element'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
