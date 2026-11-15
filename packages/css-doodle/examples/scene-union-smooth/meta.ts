// smooth: rounded joins that blend the colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "smooth: rounded joins that blend the colors",
  summary: "smooth rounds the joins of a group with a curve of that radius, and blends the colors where the shapes meet. The shapes in a group take its fill unless they have their own. The variants raise smooth from 0 to .3.",
  section: "Scenes",
  tags: ["@scene", "union", "smooth", "fill", "sphere"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
