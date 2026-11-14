// motion example: Screen swap with a page crossfade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Screen swap with a page crossfade',
  summary: 'Tap between an Inbox and a Calendar screen and the old screen dissolves into the new one instead of cutting. One .new({ opacity }) line on animateView turns a hard swap into a crossfade, with no styling of the screens themselves.',
  section: 'animateView',
  tags: ['animateView', 'new', 'opacity', 'crossfade'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
