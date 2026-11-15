// Textures see the cell's custom properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Textures see the cell's custom properties",
  summary: "The doodle inside a texture sees the cell's custom properties, so every cell of a grid can sample a different drawing. --c is a color per cell, the texture paints it as a circle, and the pattern repeats it.",
  section: "Patterns",
  tags: ["@pattern", "texture", "--name", "@pn"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
