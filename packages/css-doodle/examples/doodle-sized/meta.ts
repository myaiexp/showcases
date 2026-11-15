// Digits glued to @doodle set its pixel size; background-size changes the fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sized nested doodles',
  summary:
    "As a background a nested doodle is sized to cover unless a background-size follows. Digits glued to the name set the rendered image's pixel size: @doodle40 makes a 40 px tile that repeats when background-size says 40px, and @doodle200x100 a wide one, here contained in each cell.",
  section: 'Nested doodles',
  tags: ["@doodle", "sized @doodle", "background-size"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md", "pages/css-doodle-com/syntax-overview.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
