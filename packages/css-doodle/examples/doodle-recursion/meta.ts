// @doodle recursion: random grid sizes at three levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Doodles two levels deep',
  summary:
    "The docs' recursion: an outer grid of 2 or 3, each cell drawn by a nested doodle whose grid size is @r4, whose cells are drawn by another nested doodle, whose cells are an @svg half-square. Every level picks its own size, so each redraw makes a different mosaic of triangles.",
  section: 'Nested doodles',
  tags: ["@doodle", "recursion", "@r", "@svg"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
