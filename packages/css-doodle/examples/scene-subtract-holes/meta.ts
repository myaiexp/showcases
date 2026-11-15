// subtract and intersect: a rounded cube with three holes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "subtract and intersect: a rounded cube with three holes",
  summary: "union, subtract and intersect join the shapes inside them, and subtract takes the rest away from the first one. A cube intersected with a sphere gives a rounded cube, and three cylinders along the axes are subtracted from it. The camera turns slowly.",
  section: "Scenes",
  tags: ["@scene", "subtract", "intersect", "cylinder", "sphere", "box"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
