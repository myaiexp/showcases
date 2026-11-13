// gsap example: tween.kill() with a target, a property list, both, or neither
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Partial kill by target and property',
  summary:
    'One staggered tween moves two boxes in x, y and rotation. Buttons call kill() on only the rotation, only one box, one box\'s x and y, or the whole tween, so you can watch what keeps running.',
  section: 'Tweens',
  tags: ['kill', 'targets', 'stagger', 'properties'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/kill-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/targets-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/isActive-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
