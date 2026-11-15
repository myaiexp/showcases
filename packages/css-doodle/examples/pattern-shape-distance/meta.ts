// shape: a distance written with du and dv
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape: a distance written with du and dv",
  summary: "Instead of a name, shape takes a distance in du and dv, the offsets inside the cell. The variants write a Chebyshev square, a Manhattan diamond, a lattice mixing the smaller and larger offsets, and a pentagon with ngon().",
  section: "Patterns",
  tags: ["@pattern", "shape", "du", "dv", "ngon"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
