// gsap example: ScrollTrigger mistake, one tween for many sections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger mistake: one tween for many boxes',
  summary:
    'Looping over boxes but tweening all of them with the first box as trigger moves everything at once. Two linked scroll boxes show the mistake beside the documented fix of one tween and one trigger per box.',
  section: 'Resources',
  tags: ['ScrollTrigger', 'mistakes', 'scrub', 'trigger', 'forEach', 'sections'],
  docs: [
    'pages/gsap-com/resources/st-mistakes.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
