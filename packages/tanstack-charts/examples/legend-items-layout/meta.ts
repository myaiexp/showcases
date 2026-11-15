// tanstack-charts example: Compact legend rows and wrapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compact legend rows and wrapping',
  summary:
    'colorLegendItems switches a categorical legend from equal-width columns to compact rows measured with the chart font. justify start or center wraps eight long labels onto several rows, with gap between items and rowGap between rows. stretch is the default equal-column layout.',
  section: 'Legends and Color',
  tags: ['colorLegendItems', 'justify', 'gap', 'rowGap'],
  docs: [
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/reference/scales-guides-and-color.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
