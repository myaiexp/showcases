// A user function in a scene: --name() and $name()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A user function in a scene: --name() and $name()",
  summary: "$name(…) calls a function defined with --name(), as in @pattern. --tint(n) turns a copy number into a color, so twelve copies are colored by one call.",
  section: "Scenes",
  tags: ["@scene", "--name()", "$name()", "sphere*12"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
