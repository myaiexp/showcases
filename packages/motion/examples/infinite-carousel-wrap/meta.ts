// motion example: Photo carousel that loops with prev and next
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo carousel that loops with prev and next',
  summary: 'A five-photo carousel with previous and next buttons that never reach a dead end. wrap(0, count, index + 1) sends the last photo back to the first, and wrap(0, count, index - 1) sends the first to the last, so there are no edge cases to code.',
  section: 'Utils',
  tags: ['wrap', 'pagination', 'animate'],
  docs: ['pages/motion-dev/docs/wrap.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
