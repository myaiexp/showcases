// gsap example: ScrollTrigger.observe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger.observe',
  summary:
    'Wheel, swipe or press and drag inside the box and ScrollTrigger.observe() steers a puck with onChange deltas, lights the arrow for onUp, onDown, onLeft and onRight, outlines the box on hover and glides the puck home from onStop. It never imports Observer: observe() is the same thing inside ScrollTrigger.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'observe', 'Observer', 'onChange', 'onStop', 'onHover', 'wheel', 'touch', 'pointer'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-observe-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/deltaX.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/velocityY.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/kill-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
