// css-doodle example: Reusing a stored body with $name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reusing a stored body with $name",
  summary:
    "A body in parentheses kept in a custom property is reused with $name, and commands after it add to it or override it. Declared on :doodle, the body is written once for nine cells, each with its own k.",
  section: 'Shapes',
  tags: ['@shape', ':doodle', '$name', 'k'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
