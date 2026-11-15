// tanstack-charts example: Vertical bars on a band scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vertical bars on a band scale',
  summary:
    'barY draws one bar per row from zero up to y, centred in the band of its x category. A band scale with padding gives predictable bar widths that follow the chart\'s size. Hover for the original row.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'scaleBand', 'padding', 'tooltip'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
