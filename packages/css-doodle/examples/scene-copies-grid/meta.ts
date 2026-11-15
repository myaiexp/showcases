// name*XxY: copies in a grid, with nx and ny
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "name*XxY: copies in a grid, with nx and ny",
  summary: "name*N repeats a shape, and name*XxY repeats it in a grid, each copy reading its column and row as nx and ny. A table top is one box; box*2x2 makes its four legs from one line.",
  section: "Scenes",
  tags: ["@scene", "box*2x2", "nx", "ny", "move"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
