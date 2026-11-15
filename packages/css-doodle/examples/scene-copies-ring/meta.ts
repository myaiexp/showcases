// n and N: twelve spheres around a ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "n and N: twelve spheres around a ring",
  summary: "Each copy reads its number as n, from 1, and the count as N. sphere*12 turns each copy by n * 30 degrees around y and gives it a hue of n / N, so twelve spheres sit on a ring in a rainbow.",
  section: "Scenes",
  tags: ["@scene", "sphere*12", "n", "N", "rotate", "hsl"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
