// spiral(dx, dy): the index on a square spiral from the center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "spiral(dx, dy): the index on a square spiral from the center",
  summary: "spiral(dx, dy) is the index of a cell along a square spiral that starts at the center. Each cell maps its index to a hue that shifts with time, so rainbow arms run outward along the spiral.",
  section: "Patterns",
  tags: ["@pattern", "spiral", "dx", "dy", "hsl"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
