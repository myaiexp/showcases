// motion example: Ticking clock hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ticking clock hand',
  summary: 'A second hand that ticks rather than sweeps. Passing steps(n) as ease makes an animation hold still and jump in n equal steps. By default each jump happens at the end of its step; steps(n, "start") jumps first, which is the difference you can flip in the controls.',
  section: 'Easing',
  tags: ['ease', 'steps', 'rotate', 'repeat', 'animate'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
