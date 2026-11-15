// galacean example: Dynamic collider: solverIterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: solverIterations",
  summary:
    "Three stacks of five light crates under one heavy block, built with solverIterations 1, 4 and 16. More iterations resolve the heavy contacts more accurately, and the readout shows how far the top block sinks.",
  section: "Physics",
  tags: ['DynamicCollider.solverIterations', 'DynamicCollider.mass'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
