// aframe example: animation: easings side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: easings side by side",
  summary: "Eight spheres travel the same distance in the same time, each with a different easing from the docs' table: linear, the Quad, Cubic and Expo curves, and the Back and Elastic ones that overshoot. A text label names each lane.",
  section: 'Components',
  tags: ["animation", "easing", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeOutElastic", "easeOutBack", "linear", "dir: alternate"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
