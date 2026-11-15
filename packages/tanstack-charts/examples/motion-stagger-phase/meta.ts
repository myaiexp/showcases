// tanstack-charts example: Staggering a chosen phase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Staggering a chosen phase',
  summary:
    'stagger() defaults to the enter phase, and phase picks others. Here the delay applies to updates as well, using a tween because a spring update ignores its delay so it cannot freeze incoming momentum. Bars then move one after the other when the data changes.',
  section: 'Motion',
  tags: ['stagger', 'phase', 'update', 'tween'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
