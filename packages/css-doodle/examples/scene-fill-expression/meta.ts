// fill as an expression in p
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fill as an expression in p",
  summary: "fill may be an expression in p, the point in the shape's own space, that gives a color. mix(#f06, #0cf, p.x + .5) blends two colors along the torus's x axis.",
  section: "Scenes",
  tags: ["@scene", "fill", "p", "mix", "torus"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
