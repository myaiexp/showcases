// gsap example: Scroller proxy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroller proxy',
  summary:
    'A box with overflow hidden is scrolled by a hand-written eased position (wheel or slider moves a target, a ticker glides toward it), and ScrollTrigger.scrollerProxy() tells ScrollTrigger to read that position through scrollTop(). Cards scrub in and a meter fills from the proxied scroll.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'scrollerProxy', 'scrollTop', 'custom scroller', 'update', 'smooth scrolling'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-scrollerProxy-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-update-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/scroller.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
