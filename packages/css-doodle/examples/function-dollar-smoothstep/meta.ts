// smoothstep() inside $() eases a scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: smoothstep falloff",
  summary: "smoothstep(a, b, x) eases from 0 to 1 as x goes from a to b, so 1 - smoothstep(0, 5, @dr) shrinks the dots smoothly towards the edge. The variants change the edge of the ramp.",
  section: "Values",
  tags: ["$()","smoothstep","@dr","scale"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
