// Swizzle on the left: writing only some channels of a vector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swizzle on the left: writing only some channels of a vector",
  summary: "v.xy: … writes only those channels of a vector. A color c starts as vec3(uv, .5); in the right half c.xy: c.yx swaps its red and green, and c.z: … changes only the blue channel over time.",
  section: "Patterns",
  tags: ["@pattern", "swizzle", "match", "vec3"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
