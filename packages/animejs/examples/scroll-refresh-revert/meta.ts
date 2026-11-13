// Scroll example: ScrollObserver refresh() and revert()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll observer refresh() and revert()',
  summary: 'Thresholds written as functions are re-computed each time refresh() is called while a tween moves them, so the debug markers slide. The revert() button disables the observer and removes its markers and listeners; Rebuild makes a new one.',
  section: 'Events',
  tags: ['onScroll', 'refresh', 'revert', 'enter', 'leave', 'debug'],
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-methods/refresh.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-methods/revert.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-methods.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
