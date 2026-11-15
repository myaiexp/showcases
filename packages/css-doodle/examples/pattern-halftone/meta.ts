// Halftone: dot size from a field, with shape: circle and size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Halftone: dot size from a field, with shape: circle and size",
  summary: "Each cell is masked by a circle whose size comes from the value of a field sampled at the cell, the way a printed halftone works. A moving fbm field makes the dots swell and shrink.",
  section: "Patterns",
  tags: ["@pattern", "shape", "size", "fbm", "circle"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
