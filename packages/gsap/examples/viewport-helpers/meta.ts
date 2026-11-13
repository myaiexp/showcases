// gsap example: Viewport helpers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport helpers',
  summary:
    'Scroll a page of its own (an iframe) and read isInViewport() with a proportion, positionInViewport() from the top, centre and bottom of a box, the same two in horizontal mode for a box sliding sideways, maxScroll() and the instance scroll() getter and setter. Buttons call scroll() and clearScrollMemory().',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'isInViewport', 'positionInViewport', 'maxScroll', 'scroll()', 'clearScrollMemory', 'isTouch'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-isInViewport-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-positionInViewport-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-maxScroll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/scroll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-clearScrollMemory-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-isTouch.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
