// vchart example: API: updateViewBox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: updateViewBox',
  summary:
    'updateViewBox draws the chart into a rectangle { x1, y1, x2, y2 } of its canvas without resizing the canvas itself. Four sliders set the box\'s insets and the card breathes the rectangle in and out.',
  section: 'API',
  tags: ['updateViewBox', 'viewBox', 'IBoundsLike'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
