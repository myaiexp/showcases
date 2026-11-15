// rand() and @pn in copies: each one different
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rand() and @pn in copies: each one different",
  summary: "rand() is a number that differs from copy to copy, and @pn steps from copy to copy inside a copy such as sphere*14. Here each sphere gets a random radius and height, and colors alternate through a list. The cards redraw with a new seed.",
  section: "Scenes",
  tags: ["@scene", "rand()", "@pn", "sphere*14"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
