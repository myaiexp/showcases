// gsap example: startTime(), endTime(), globalTime() and delay() of a tween nested two timelines deep
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween startTime, endTime and globalTime',
  summary:
    'A tween nested in a timeline that is nested in another is drawn on a ruler twice: at its startTime() and endTime() inside the parent, and converted by globalTime(). Sliders change delay, startTime and the inner timeline\'s timeScale.',
  section: 'Tweens',
  tags: ['startTime', 'endTime', 'globalTime', 'delay', 'duration', 'nesting'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/startTime-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/endTime-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/globalTime-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/delay-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/duration-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
