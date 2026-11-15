// vega example: Force: N-Body Strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: N-Body Strength",
  summary:
    "Ninety nodes repel or attract each other depending on the nbody strength; distanceMax limits how far the force reaches.",
  section: "Transforms: Layout",
  tags: ["transform.force.forces.nbody"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
