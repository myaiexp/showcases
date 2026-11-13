// gsap example: Refresh order, refreshPriority and sort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Refresh order, refreshPriority and sort',
  summary:
    'A pinned section sits between two plain triggers in a scroll box. Create them out of page order and the trigger below the pin starts too early; the readout compares its start to where the layout says it belongs. Fix it with creation order, refreshPriority, sort() and refresh(), and read the refresh order with previous() and next().',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'sort', 'refreshPriority', 'refresh', 'pin', 'previous', 'next', 'order'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-sort-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-refresh-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/next-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/previous-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/pin.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/resources/st-mistakes.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
