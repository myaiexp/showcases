// gsap example: ScrollTrigger.matchMedia breakpoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger.matchMedia breakpoints',
  summary:
    'The older ScrollTrigger.matchMedia() sets up different scrubbed animations for a wide and a narrow page, and the iframe that holds it is resized to cross the breakpoint. The triggers made inside each query are reverted when it stops matching, a returned teardown function runs, an "all" key persists, and buttons call clearMatchMedia() and killAll().',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'matchMedia', 'clearMatchMedia', 'saveStyles', 'killAll', 'responsive', 'teardown'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-matchMedia-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-clearMatchMedia-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-saveStyles-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-killAll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-addEventListener-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
