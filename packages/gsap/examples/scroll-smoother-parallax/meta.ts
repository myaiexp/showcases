// gsap example: ScrollSmoother parallax and lag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollSmoother parallax and lag',
  summary:
    'ScrollSmoother smooths the native scroll of a page of its own (an iframe, so it never takes over the gallery). Columns with data-speed 0.5 and 1.5 meet the reference column at the viewport centre, data-lag trails behind, and data-speed="auto" pans a tall layer inside a clipped window.',
  section: 'ScrollSmoother',
  tags: ['ScrollSmoother', 'parallax', 'data-speed', 'data-lag', 'smooth scroll'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/vars.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollSmoother/kill-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-maxScroll-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
