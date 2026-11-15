// A still texture as a height field: slope shading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A still texture as a height field: slope shading",
  summary: "A texture doodle may have a @pattern of its own as its background; it is drawn once, as a still image, which suits a field read many times. Here the texture holds fbm noise, and the main pattern reads neighboring points to work out the slope and light it.",
  section: "Patterns",
  tags: ["@pattern", "texture", "fbm", "uv"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
