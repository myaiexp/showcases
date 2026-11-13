// Scroll example: onResize callback fired when the scroll container changes size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll observer onResize on a resizing container',
  summary: 'A square linked to an inner scroll container whose height you change with a slider (the card breathes it on its own). A counter goes up every time onResize fires, and the readout shows the container height.',
  section: 'Events',
  tags: ['onScroll', 'onResize', 'container', 'sync'],
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-callbacks/onresize.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
