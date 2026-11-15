// vega example: Force: X and Y Beeswarm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: X and Y Beeswarm",
  summary:
    "Per-node x and y forces pull bubbles toward their group focus while collide keeps them apart, computed in one static batch.",
  section: "Transforms: Layout",
  tags: ["transform.force.static", "transform.force.forces.x", "transform.force.forces.y", "transform.force.forces.collide"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/transforms/force.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
