// galacean example: Material: bounciness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: bounciness",
  summary:
    "Five balls with bounciness 0, 0.25, 0.5, 0.75 and 1 are dropped from the same height; both materials use the Minimum combine mode, so each ball bounces to its own value. Drop height is shared; only the PhysicsMaterial differs.",
  section: "Physics",
  tags: ['PhysicsMaterial.bounciness', 'PhysicsMaterial.bounceCombine', 'ColliderShape.material'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
