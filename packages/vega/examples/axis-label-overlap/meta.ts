// vega example: Axis labelOverlap: Parity and Greedy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis labelOverlap: Parity and Greedy",
  summary:
    "Forty-five crowded labels with no overlap handling, with parity (drop every other) and with greedy (drop what collides); labelSeparation then pushes the survivors apart.",
  section: "Axes",
  tags: ["axes.labelOverlap","axes.labelSeparation"],
  docs: ["repo/docs/docs/axes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
