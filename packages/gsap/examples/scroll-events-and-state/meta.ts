// gsap example: Scroll events and isScrolling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll events and isScrolling',
  summary:
    'Global ScrollTrigger events (scrollStart, scrollEnd, refreshInit, revert, refresh) are logged as you scroll a box or press refresh, with checkboxes that add and remove each listener and a lamp for isScrolling(). A button calls update(), which re-reads the scroll without recalculating anything.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'addEventListener', 'removeEventListener', 'isScrolling', 'update', 'refresh', 'scrollEnd'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-addEventListener-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-removeEventListener-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-isScrolling-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-update-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-refresh-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
