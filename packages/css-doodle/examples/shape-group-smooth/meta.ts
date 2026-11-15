// css-doodle example: Smooth joins in a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smooth joins in a group",
  summary:
    "smooth rounds every place where two shapes in a group meet with a curve of that radius. At 0 the circles meet at a sharp notch, and larger radii fill in a neck.",
  section: 'Shapes',
  tags: ['@shape', 'smooth', 'union'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
