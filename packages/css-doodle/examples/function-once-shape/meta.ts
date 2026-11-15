// @once(@p(...)) picks a single @shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Once: one random shape for every cell",
  summary: "Every cell takes the same shape, chosen at random once per render, while the rotation of each is its own. Without @once each cell would pick a shape of its own.",
  section: "Values",
  tags: ["@once","@shape","@p","@r"],
  docs: ["pages/css-doodle-com/reference/function-once.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
