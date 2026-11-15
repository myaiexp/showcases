// vega example: Force: Alpha and Velocity Decay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: Alpha and Velocity Decay",
  summary:
    "A ring graph with sliders for alpha, alphaTarget and velocityDecay: a warm target keeps nodes in motion, low decay makes them skate.",
  section: "Transforms: Layout",
  tags: ["transform.force.alpha", "transform.force.alphaTarget", "transform.force.velocityDecay"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
