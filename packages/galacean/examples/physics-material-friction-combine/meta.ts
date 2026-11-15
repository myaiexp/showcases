// galacean example: Material: frictionCombine modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: frictionCombine modes",
  summary:
    "Four crates (friction 0.5) are shoved across a floor of friction 0.8, each with its own frictionCombine: Average, Minimum, Multiply, Maximum. The mode decides the combined friction, so they stop at different distances.",
  section: "Physics",
  tags: ['PhysicsMaterialCombineMode', 'PhysicsMaterial.frictionCombine', 'PhysicsMaterial.staticFriction'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
