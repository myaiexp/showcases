// A scene in every cell: @r and @p inside the body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A scene in every cell: @r and @p inside the body",
  summary: "@ functions in the body run for each cell, so every cell of a 3 × 3 grid draws its own model: a box turned by a random angle around a random axis, with a color picked from a list. The cards redraw with a new seed.",
  section: "Scenes",
  tags: ["@scene", "@r", "@p", "rotate", "box"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
