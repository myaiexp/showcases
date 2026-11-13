// gsap example: ScrollSmoother effects method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollSmoother effects method',
  summary:
    'In a smooth-scrolled page of its own, smoother.effects() applies function-based speed and lag to a row of columns so they fan out in the viewport, and removes them again by setting speed 1 and lag 0. The getter lists the ScrollTriggers behind the effects, and two columns at the top compare data-speed with clamp().',
  section: 'ScrollSmoother',
  tags: ['ScrollSmoother', 'effects', 'speed', 'lag', 'function-based values', 'clamp()', 'data-speed'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/effects-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/kill-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-maxScroll-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
