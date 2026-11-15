// css-doodle example: Contours: nested rings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contours: nested rings",
  summary:
    "A comma in r starts another contour: each takes the next item of the list, and with evenodd the inner ones cut holes. Four radii give four concentric rings.",
  section: 'Shapes',
  tags: ['@shape', 'r', 'fill-rule', 'points'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
