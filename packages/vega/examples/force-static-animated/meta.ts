// vega example: Force: Static or Animated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: Static or Animated",
  summary:
    "The static flag computes the layout in one batch, while iterations decides how many steps run; fresh nodes show a graph going from tangled to settled.",
  section: "Transforms: Layout",
  tags: ["transform.force.static", "transform.force.iterations"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/transforms/force.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/data.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
