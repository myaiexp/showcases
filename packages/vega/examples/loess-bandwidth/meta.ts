// vega example: Loess: Bandwidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Loess: Bandwidth",
  summary:
    "A noisy sine scatter with a loess trend line. A small bandwidth follows every wiggle, a large one flattens toward a straight line.",
  section: 'Transforms: Basic',
  tags: ["transform.loess.bandwidth", "transform.loess.x", "transform.loess.y", "transform.loess.as"],
  docs: ["repo/docs/docs/transforms/loess.md", "repo/docs/docs/transforms/regression.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
