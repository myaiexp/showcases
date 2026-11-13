// GSAP example: repeat, yoyo and repeatRefresh compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeat, yoyo and repeatRefresh',
  summary:
    'Three balls repeat forever: one snaps back each loop, one yoyos, and one yoyos to a fresh random target each full iteration thanks to repeatRefresh. A slider changes repeatDelay live.',
  section: 'Tweens',
  tags: ['repeat', 'yoyo', 'repeatRefresh', 'repeatDelay', 'random'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/repeat-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/yoyo-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/repeatDelay-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
