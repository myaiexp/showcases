// Scroll example: ScrollObserver.link() connecting and replacing the linked animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll observer link() switches the linked animation',
  summary: 'A standalone onScroll() observer with two animations. link() connects one at a time, so each click hands the scroll over to the other square and leaves the first one where it stopped.',
  section: 'Events',
  tags: ['onScroll', 'link', 'ScrollObserver', 'autoplay'],
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-methods/link.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-methods.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
