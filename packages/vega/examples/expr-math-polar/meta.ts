// vega example: Expressions: hypot and atan2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: hypot and atan2",
  summary:
    "A point in the plane with its radius circle and angle arc, and a table in which hypot, atan2, atan, asin and acos recover the radius and the angle from the two coordinates.",
  section: 'Expressions',
  tags: ["expression.hypot","expression.atan2","expression.acos","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
