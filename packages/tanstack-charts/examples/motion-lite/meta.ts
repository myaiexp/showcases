// tanstack-charts example: motionLite for a smaller renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'motionLite for a smaller renderer',
  summary:
    'motionLite fades the whole chart in on first paint and tweens keyed SVG updates. It takes only duration, easing, initial, respectReducedMotion and resize, and ignores definition motion, so there are no springs or staggering. It is imported from motion/lite and not re-exported from motion.',
  section: 'Motion',
  tags: ['motionLite', 'duration', 'easing', 'initial'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
