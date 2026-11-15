// gradient-2d's @mesh-gradient: rows of colours, top row first, points movable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@mesh-gradient()',
  summary:
    "The gradient-2d addon's @mesh-gradient() draws a 2D gradient with WebGL: rows of colours, top row first, blended with smooth curves. `<color> at <x> <y>` moves one point (the white here). A single row runs left to right, and a shorter row repeats its last colour.",
  section: 'Addons',
  tags: ["@use", "gradient-2d", "@mesh-gradient", "addons"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/gradient-2d/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
