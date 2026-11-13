// gsap example: reading targets(), data and vars from a live tween
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween targets, data and vars',
  summary:
    'A staggered tween over a selector exposes the matched elements through targets(), the object passed as vars.data through data (updated from onRepeat and a button), and its original config through vars.',
  section: 'Tweens',
  tags: ['targets', 'data', 'vars', 'inspect'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/targets-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/data.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/vars.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
