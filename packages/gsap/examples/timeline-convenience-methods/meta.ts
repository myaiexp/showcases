// gsap example: a chained timeline of from, to, fromTo and set, with its vars, data, delay and parent shown
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline convenience methods and vars',
  summary:
    'One timeline chains from(), to(), fromTo(), set() and to() on a single box; chips light up as the playhead reaches each step. The timeline is created with an id, data, delay and defaults, and the panel reads them back along with its parent.',
  section: 'Timelines',
  tags: ['from', 'to', 'fromTo', 'set', 'vars', 'data', 'delay', 'parent', 'defaults'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/to-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/from-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/fromTo-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/set-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/vars.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/data.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/delay-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/parent.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
