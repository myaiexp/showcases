// motion example: Photo wall that ripples out from a tap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo wall that ripples out from a tap',
  summary: 'A wall of coloured photo tiles. Tap one and a wave of scale and brightness spreads outward from it in a circle. stagger() with grid: [columns, rows] and from set to the tapped index works out each tile\'s distance in two dimensions.',
  section: 'Utils',
  tags: ['stagger', 'grid', 'from', 'index', 'animate'],
  docs: ['pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
