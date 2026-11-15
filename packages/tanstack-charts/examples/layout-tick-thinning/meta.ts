// tanstack-charts example: Tick label thinning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick label thinning',
  summary:
    'Thirty-six crowded category labels. Thinning drops labels that collide, keep protects chosen ones, priority ends favours the ends and rotation changes the measured bounds.',
  section: 'Layout, Axes, and Coordinates',
  tags: ['tickLabels.thin', 'minGap', 'priority', 'keep', 'rotate'],
  docs: ['repo/docs/concepts/layout-axes-and-coordinates.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
