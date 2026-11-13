// gsap example: addPause stops a timeline at fixed points while call() fires in-sequence callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pauses and callbacks in a timeline',
  summary:
    'A box moves in three legs. addPause() stops the timeline between legs and calls back, call() drops callbacks at fixed spots, and a Continue button resumes the timeline.',
  section: 'Timelines',
  tags: ['timeline', 'addPause', 'call', 'resume', 'delayedCall'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/addPause-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/call-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/resume-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-delayedCall-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
