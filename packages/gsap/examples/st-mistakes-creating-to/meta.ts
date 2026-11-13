// gsap example: ScrollTrigger mistake, creating to() logic issues
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger mistake: stacked to() tweens',
  summary:
    'Two scrubbed to() tweens on one property jump back to the start between their ranges, because the later tween caches its starting value on creation. Four lanes scroll together: the mistake, then the three documented fixes (immediateRender: false, fromTo() and one timeline).',
  section: 'Resources',
  tags: ['ScrollTrigger', 'mistakes', 'to()', 'immediateRender', 'fromTo', 'timeline', 'scrub'],
  docs: [
    'pages/gsap-com/resources/st-mistakes.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
