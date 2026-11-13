// gsap example: labels on a paused timeline, scrubbed with tweenTo and tweenFromTo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Labels and tweenTo',
  summary:
    'A dot visits four corners of a paused timeline, one label per corner. Buttons run tweenTo, tweenFromTo and seek to jump the playhead between labels while currentLabel() is read out live.',
  section: 'Timelines',
  tags: ['timeline', 'addLabel', 'tweenTo', 'tweenFromTo', 'seek', 'currentLabel'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/tweenTo-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/tweenFromTo-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/currentLabel-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/addLabel-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/seek-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
