// animejs example: Same motion in the JS engine and WAAPI under CPU load
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same motion in the JS engine and WAAPI under CPU load',
  summary: 'Runs one translate-and-rotate with animate() and with waapi.animate(), then blocks the main thread so you can see which one keeps moving smoothly.',
  section: 'WAAPI',
  tags: ['waapi', 'animate', 'createTimer', 'cubicBezier', 'hardware acceleration'],
  docs: [
    'pages/animejs-com/documentation/web-animation-api/hardware-accelerated-animations.md',
    'pages/animejs-com/documentation/web-animation-api/when-to-use-waapi.md',
    'pages/animejs-com/documentation/easings/cubic-bezier-easing.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
