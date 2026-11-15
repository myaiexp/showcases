// tanstack-charts example: Motion decided per datum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion decided per datum',
  summary:
    'A mark motion option can be a function. It receives the phase, datum index and datum, and returns timing for that target. Entering bars wait 35 ms per index, and bars whose status is forecast use a short tween instead of the renderer spring.',
  section: 'Dynamic Data and Animation',
  tags: ['motion', 'ChartMotionContext', 'phase', 'datumIndex'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
