// Pixels and variables: fire from fbm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pixels and variables: fire from fbm",
  summary: "Without grid the whole image is one cell, so uv and pos address each pixel. Any name that is not a keyword, like n and h, is a variable; here fbm of uv scrolling with time becomes a flame whose red, green and blue climb at different rates.",
  section: "Patterns",
  tags: ["@pattern", "uv", "fbm", "clamp", "vec3"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
