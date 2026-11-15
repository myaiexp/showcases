// Sampling a texture along a spiral
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sampling a texture along a spiral",
  summary: "A texture can be sampled at any point from 0 to 1. Here a gradient with random angle and stripes from @stripe is the texture, and the pattern reads it along a spiral built from polar coordinates and the time.",
  section: "Patterns",
  tags: ["@pattern", "texture", "@stripe", "atan", "log"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
