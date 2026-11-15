// aframe example: material: blending none, normal, additive, subtractive, multiply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: blending none, normal, additive, subtractive, multiply",
  summary: "Five overlapping discs of the same glow texture, each with a different blending mode, sit in front of a coloured band. Additive piles light up, subtractive darkens, multiply tints, and none ignores the alpha channel completely.",
  section: 'Components',
  tags: ["material", "blending", "additive", "subtractive", "multiply", "normal", "none", "transparent"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
