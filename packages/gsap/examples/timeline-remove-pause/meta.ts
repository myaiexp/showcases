// gsap example: removePause(time) deleting pauses that addPause() placed in a timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'removePause and timeline paused state',
  summary:
    'A box crosses a track on a timeline with pauses at 1s and 2s. play() resumes after each stop, and toggles remove a pause with removePause(time) or add it back so the box runs straight through.',
  section: 'Timelines',
  tags: ['removePause', 'addPause', 'paused', 'play', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/removePause-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/addPause-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/paused-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/play-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/restart-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
