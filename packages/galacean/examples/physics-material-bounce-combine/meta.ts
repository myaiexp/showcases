// galacean example: Material: bounceCombine modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: bounceCombine modes",
  summary:
    "The same ball (bounciness 0.4) falls on a floor of 0.8 four times, each with a different bounceCombine: Average, Minimum, Multiply, Maximum. The higher-priority mode of the two materials decides, so the bounce heights differ.",
  section: "Physics",
  tags: ['PhysicsMaterialCombineMode', 'PhysicsMaterial.bounceCombine', 'PhysicsMaterial.bounciness'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
