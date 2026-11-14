// motion example: Cards that lean with scroll speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cards that lean with scroll speed',
  summary: 'A shelf of album cards that tilt the faster you scroll and spring upright when you stop, so the page feels like it has weight. scroll() passes a second info argument to its callback; info.y.velocity gives the speed in pixels per second.',
  section: 'scroll',
  tags: ['scroll', 'info', 'velocity', 'container', 'spring', 'skewY'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
