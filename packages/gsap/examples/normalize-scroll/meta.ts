// gsap example: Normalize scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize scroll',
  summary:
    'ScrollTrigger.normalizeScroll() moves scrolling of a page of its own (an iframe) onto the JavaScript thread, with a pinned scrub section that no longer jumps. Toggle it, pass a config object so the page can be dragged with the mouse, and read the Observer it returns.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'normalizeScroll', 'Observer', 'pin', 'scroll()', 'getVelocity'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-normalizeScroll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/scroll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/getVelocity-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-maxScroll-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/vars.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
