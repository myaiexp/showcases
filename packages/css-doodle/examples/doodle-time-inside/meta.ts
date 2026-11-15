// Time uniforms such as @t keep working inside @doodle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time inside nested doodles',
  summary:
    "Time uniforms such as @t keep working inside a nested doodle: each 4 × 4 tile's circles change hue and pulse with a sine of the time, offset by their index.",
  section: 'Nested doodles',
  tags: ["@doodle", "@t", "animation"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md", "pages/css-doodle-com/reference/function-t.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
