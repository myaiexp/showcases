// tanstack-charts example: Tooltip motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip motion',
  summary:
    'The built-in tooltip inherits chart motion from the active renderer, so it enters and moves with the same spring. tooltip.motion overrides it with its own transition, and false keeps the tooltip immediate while the chart still animates. A pretend pointer sweeps the bars.',
  section: 'Motion',
  tags: ['tooltip', 'motion', 'tooltip.motion'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
