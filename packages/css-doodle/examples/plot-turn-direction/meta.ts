// css-doodle example: Turning cells with dir
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Turning cells with dir",
  summary:
    "@place also turns each cell, with its x axis pointing away from the centre by default. dir: reverse points it inward, dir: auto 90deg runs the cells along the circle, and a constant angle is offset by 90 degrees.",
  section: 'Shapes',
  tags: ['@plot', 'dir', '@place'],
  docs: ['pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
