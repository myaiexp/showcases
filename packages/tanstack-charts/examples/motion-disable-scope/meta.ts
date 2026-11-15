// tanstack-charts example: Turning motion off for a scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turning motion off for a scope',
  summary:
    'motion: false at any definition scope suppresses inherited motion there, and a more specific child can switch it back on. The chart animates, the first mark is frozen with motion: false, and the second mark sets its own tween again. The toggle moves the false from the mark to the whole chart.',
  section: 'Motion',
  tags: ['motion', 'motion false', 'scope'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
