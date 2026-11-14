// motion example: App icons appearing from any origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'App icons appearing from any origin',
  summary: 'A home screen of twelve app icons pops in one after another. stagger()\'s from option decides where the cascade starts: the first icon, the middle, the last, both ends at once, a random order or any icon you pick.',
  section: 'Utils',
  tags: ['stagger', 'from', 'first', 'center', 'last', 'edges', 'random', 'index'],
  docs: ['pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
