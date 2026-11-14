// motion example: Photo thumbnails that break out of their card
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo thumbnails that break out of their card',
  summary: 'An album card shrinks while its thumbnails follow a moment later. By default the thumbnails stay clipped inside the card for the whole move; switch on group(false) and they drift outside it, as if no longer attached.',
  section: 'animateView',
  tags: ['animateView', 'add', 'group', 'layout', 'delay'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
