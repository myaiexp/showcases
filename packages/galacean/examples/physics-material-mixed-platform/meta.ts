// galacean example: Material: ice, bounce and grip on one platform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: ice, bounce and grip on one platform",
  summary:
    "The docs' mixed platform: one StaticCollider with a normal shape, an icy shape (friction 0.1 / 0.05) and a bouncy shape (bounciness 0.8, Maximum combine). Crates dropped with a sideways push stop, slide on and bounce.",
  section: "Physics",
  tags: ['PhysicsMaterial', 'ColliderShape.material', 'PhysicsMaterialCombineMode.Maximum'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
