// gsap example: timeScale, reverse and reversed control a looping staggered timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline speed and direction',
  summary:
    'A looping three-step timeline of five bars. Drag the timeScale slider, pause, resume or reverse it, with timeScale(), reversed() and progress() read out live. The card tweens the timeScale itself.',
  section: 'Timelines',
  tags: ['timeline', 'timeScale', 'reverse', 'reversed', 'pause', 'resume', 'defaults', 'stagger'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/timeScale-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/reverse-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/reversed-.md',
    'pages/gsap-com/resources/getting-started/control.md',
    'pages/gsap-com/resources/getting-started/timelines.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
