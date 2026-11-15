// tanstack-charts example: Legend indicator shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend indicator shapes',
  summary:
    'Legend indicators are renderer-neutral shapes: dot, square, line or line-dot. A function of the series picks one per item, here a line with a point for the series drawn as a line and a square for the one drawn as bars. width, height and gap reserve the indicator box.',
  section: 'Legends and Color',
  tags: ['colorLegendItems', 'indicator', 'shape', 'width', 'height', 'gap'],
  docs: [
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/reference/scales-guides-and-color.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
