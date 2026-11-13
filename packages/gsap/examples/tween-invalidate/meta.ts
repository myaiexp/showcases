// gsap example: restart() versus invalidate().restart() with relative and random end values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween invalidate',
  summary:
    'Two tweens use a relative rotation (+=90) and a random x. restart() replays the recorded values; invalidate() first clears them, so the rotation keeps stacking and x lands somewhere new.',
  section: 'Tweens',
  tags: ['invalidate', 'restart', 'relative values', 'random'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/invalidate-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/restart-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/random-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
