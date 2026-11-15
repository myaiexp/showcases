// A doodle texture: texture(texture0, uv) tiles a drawing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A doodle texture: texture(texture0, uv) tiles a drawing",
  summary: "A section named texture0 holds doodle code, rendered to an image, and texture(texture0, uv) reads it. The image repeats past its edges, so 4uv tiles it 4 × 4. Here the doodle is a heart from @shape; the variants change how often it tiles.",
  section: "Patterns",
  tags: ["@pattern", "texture", "@shape", "uv"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
