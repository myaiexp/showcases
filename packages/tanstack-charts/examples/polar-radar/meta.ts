// tanstack-charts example: Radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar chart",
  summary:
    "Six skills on a point angle scale and a 0 to 100 radius scale. radialArea and radialLine use the closed curve curveLinearClosed so the shape joins up, radialGrid draws polygon rings and angleGrid the labelled spokes, and radialDot adds hoverable corners.",
  section: "Polar Marks",
  tags: ['polar', 'radialArea', 'radialLine', 'radialDot', 'radialGrid', 'angleGrid', 'curveLinearClosed', 'scalePoint'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
