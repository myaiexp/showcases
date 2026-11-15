// vega example: Force: Link Graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: Link Graph",
  summary:
    "The Les Miserables network settles live under center, collide, nbody and link forces. Sliders for repulsion and link distance reheat the simulation.",
  section: "Transforms: Layout",
  tags: ["transform.force", "transform.force.forces.link", "transform.force.forces.nbody", "transform.linkpath"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/transforms/linkpath.md", "repo/docs/docs/transforms/force.vg.json", "repo/docs/data/miserables.json", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
