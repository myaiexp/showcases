// gsap example: tween.then() and timeline.then() chained as a promise sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Promise chaining with then()',
  summary:
    'Two tweens and a timeline run one after another by chaining then(): each step returns the next animation, so the promise waits for it. A log shows the order each promise resolved in.',
  section: 'Tweens',
  tags: ['then', 'promise', 'sequence', 'async'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/then-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/then-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/restart-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
