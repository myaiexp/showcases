// motion example: Side drawer toggled mid-animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Side drawer that stays smooth when you mash the button',
  summary: 'Two menu drawers are toggled again and again before they finish. The spring drawer keeps the speed it already had and turns around smoothly; the fixed-duration drawer restarts from standstill and visibly stutters.',
  section: 'animate',
  tags: ['animate', 'spring', 'interrupting animations', 'velocity', 'x', 'tween'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
