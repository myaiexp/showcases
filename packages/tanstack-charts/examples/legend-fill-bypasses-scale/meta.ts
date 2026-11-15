// tanstack-charts example: Fill bypasses the color scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fill bypasses the color scale',
  summary:
    'color maps values through the chart color scale and feeds the legend. fill and stroke are final paint overrides, so a mark that sets fill leaves the scale and the legend out of it. Toggle the override: with it on the bars are one hand-picked color per row and the legend vanishes.',
  section: 'Legends and Color',
  tags: ['color', 'fill', 'colorLegend', 'paint override'],
  docs: [
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/reference/scales-guides-and-color.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
