// motion example: Photo that grows into a detail view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo that grows into a detail view',
  summary: 'The gallery-app move: tap a thumbnail and it grows into the large photo on the detail page as one continuous shape, with the caption fading in after. Back shrinks it home. Built on the browser’s View Transitions.',
  section: 'animateView',
  tags: ['animateView', 'add', 'shared element', 'enter', 'exit', 'spring'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
