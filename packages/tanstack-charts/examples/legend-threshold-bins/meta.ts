// tanstack-charts example: Threshold bins in the legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Threshold bins in the legend',
  summary:
    'A threshold scale needs an explicit domain, because its cut points are policy and not an extent. The legend then shows exact bins at those boundaries, formatted by the legend format option. Changing the cuts changes both the point colors and the legend labels.',
  section: 'Legends and Color',
  tags: ['scaleThreshold', 'color.domain', 'color.range', 'colorLegend'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
