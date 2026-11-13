// gsap example: Direction and velocity readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Direction and velocity readout',
  summary:
    'A standalone ScrollTrigger on a scrolling box reports progress, direction and velocity in its onUpdate. An arrow flips with the direction and a meter follows getVelocity().',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'onUpdate', 'direction', 'getVelocity', 'progress', 'quickSetter'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/getVelocity-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/direction.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/progress.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-quickSetter-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
