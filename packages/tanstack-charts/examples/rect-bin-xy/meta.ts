// tanstack-charts example: Two-dimensional bins with binXY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two-dimensional bins with binXY',
  summary:
    'binXY counts points into a grid of x and y intervals; rect paints each cell from its x1/x2 and y1/y2 edges and colours it by the count. The result is a density map of bill length against depth, with the scatter\'s three clusters visible.',
  section: 'Bar and Rect Marks',
  tags: ['rect', 'binXY', 'color', 'x1', 'x2', 'y1', 'y2'],
  docs: [
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
