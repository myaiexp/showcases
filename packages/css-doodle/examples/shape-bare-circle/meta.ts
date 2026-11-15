// css-doodle example: A bare circle versus a circle with commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A bare circle versus a circle with commands",
  summary:
    "A bare circle gives the native ellipse(), while any command after it turns it into a polygon of many points. Dropping the point count shows the polygon underneath.",
  section: 'Shapes',
  tags: ['@shape', 'circle', 'points'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
