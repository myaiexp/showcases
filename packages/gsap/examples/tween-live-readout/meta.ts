// gsap example: a repeating yoyo tween with time, totalTime, progress, ratio, iteration and isActive printed live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween live readout',
  summary:
    'A box yoyos with repeat and repeatDelay while a panel prints time, totalTime, progress, totalProgress, ratio, iteration, duration and isActive on every update. Ratio leaves 0 to 1 under a back ease while progress does not.',
  section: 'Tweens',
  tags: ['time', 'totalTime', 'progress', 'totalProgress', 'ratio', 'iteration', 'isActive', 'totalDuration'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/time-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalTime-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalProgress-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalDuration-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/duration-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/iteration-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/ratio.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/isActive-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/repeatDelay-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
