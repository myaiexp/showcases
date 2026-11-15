// penrose example: nearPt: sending a shape to a point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "nearPt: sending a shape to a point",
  summary:
    'A circle and a rectangle with free centres. `encourage nearPt(shape, x, y)` pulls the centre of a shape to the point (x, y); here the circle goes to the upper left and the rectangle to the lower right.',
  section: "Objective Functions",
  tags: ['nearPt', 'encourage', 'objective', 'Circle', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
