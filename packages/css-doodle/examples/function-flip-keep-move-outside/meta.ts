// The initial M outside the function continues the path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip: keep the M outside",
  summary: "Keep the initial M outside the function to continue from the current point instead of starting a new subpath. On the left the mirrored half continues from where the first half ended, on the right an M inside starts it somewhere else.",
  section: "SVG",
  tags: ["@flip","@flipH","M","path"],
  docs: ["pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
