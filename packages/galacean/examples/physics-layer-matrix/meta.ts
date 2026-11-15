// galacean example: Collision layers: the pair table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collision layers: the pair table",
  summary:
    "Balls of four layers fall into one pile above a Layer0 floor while the table of layer pairs changes: the panel prints getColliderLayerCollision for every pair, and the piles mix or separate as pairs are switched off. The full view has a checkbox per pair.",
  section: "Physics",
  tags: ['PhysicsScene.getColliderLayerCollision', 'PhysicsScene.setColliderLayerCollision', 'Collider.collisionLayer'],
  docs: [
    'repo/docs/en/physics/collider/collisionLayer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
