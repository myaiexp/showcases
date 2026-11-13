// gsap example: Observer section navigation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Observer section navigation',
  summary:
    'Wheel, swipe or drag inside a box and Observer turns the gesture into next/previous section changes with onUp and onDown, while onChangeY reports delta and velocity. Adjust tolerance to change how far a gesture must go.',
  section: 'Observer',
  tags: ['Observer', 'onUp', 'onDown', 'onChangeY', 'tolerance', 'wheelSpeed', 'preventDefault', 'velocityY'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Observer.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/velocityY.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/deltaY.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/kill-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
