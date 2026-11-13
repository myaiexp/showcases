// gsap example: paused() and reversed() used as setters, with play, resume, reverse and restart compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'paused() and reversed() as setters',
  summary:
    'Checkboxes drive tween.paused(bool) and tween.reversed(bool) while buttons call play(), play(0), resume(), reverse() and restart() with or without the 1s delay. A readout shows how each changes paused, reversed and time.',
  section: 'Tweens',
  tags: ['paused', 'reversed', 'play', 'resume', 'restart', 'delay'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/paused-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/reversed-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/play-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/resume-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/reverse-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/restart-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/delay-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
