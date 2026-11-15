// ngon(p, n): polygons as distances
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ngon(p, n): polygons as distances",
  summary: "ngon(p, n) is a distance with an n-gon as the unit, so subtracting a radius or taking abs() outlines polygons. The variants outline a triangle, pentagon, hexagon and octagon turning with time.",
  section: "Patterns",
  tags: ["@pattern", "ngon", "rot", "shape"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
