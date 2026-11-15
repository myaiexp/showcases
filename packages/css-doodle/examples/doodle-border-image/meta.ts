// @doodle as border-image: a sized image cut into nine pieces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A doodle as a border-image frame',
  summary:
    'From the docs: a nested doodle used as a border-image. The sized form @doodle90 renders it at 90 px, three times the 30 px border, so each of the nine pieces stays 1:1, and a 3 × 3 grid puts the cuts on cell edges. 33.34% slices it into thirds, and round repeats the edge pieces around the frame.',
  section: 'Nested doodles',
  tags: ["@doodle", "border-image", "sized @doodle", "@shape", "@nth"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
