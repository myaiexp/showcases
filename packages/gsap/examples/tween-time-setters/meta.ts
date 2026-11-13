// gsap example: time(), totalTime(), totalProgress() and iteration() used as setters on a repeating tween
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'time, totalTime and iteration setters',
  summary:
    'A paused tween that repeats three times is scrubbed by four sliders: time() within a cycle, totalTime() and totalProgress() across all cycles, and iteration() to jump whole cycles. Each slider follows the others live.',
  section: 'Tweens',
  tags: ['time', 'totalTime', 'totalProgress', 'iteration', 'repeat', 'scrub'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/time-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalTime-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalProgress-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/iteration-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/totalDuration-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/repeat-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
