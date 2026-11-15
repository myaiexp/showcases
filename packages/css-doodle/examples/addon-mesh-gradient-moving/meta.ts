// gradient-2d: a position written as math with t makes the gradient move
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A moving mesh point',
  summary:
    "The centre point of a 3 × 3 mesh gradient follows a circle: its position is written as math in parentheses with t, the shader's time in seconds, so the gradient redraws every frame. It is set with @content, a live canvas, which draws a moving gradient faster than background would.",
  section: 'Addons',
  tags: ["gradient-2d", "@mesh-gradient", "t", "@content"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/gradient-2d/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
