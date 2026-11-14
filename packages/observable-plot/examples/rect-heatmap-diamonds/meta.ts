// observable-plot example: Rect: two-dimensional bin heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: two-dimensional bin heatmap',
  summary:
    'Plot.bin on carat and price counts diamonds per cell, shown as fill on a symlog colour scale. The select swaps the colour scheme.',
  section: 'Mark: Rect',
  tags: ['rect', 'bin', 'fill', 'color.type', 'symlog', 'thresholds'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/diamonds.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
