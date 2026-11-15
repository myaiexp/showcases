// name#id and #id: keep a shape and draw it where needed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "name#id and #id: keep a shape and draw it where needed",
  summary: "A shape used in more than one place takes a name: name#id keeps it for later instead of drawing it, and #id draws it, with any rows given there added. One torus is declared, then drawn three times, each with its own move, rotation and color.",
  section: "Scenes",
  tags: ["@scene", "#id", "torus", "rotate", "fill"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
