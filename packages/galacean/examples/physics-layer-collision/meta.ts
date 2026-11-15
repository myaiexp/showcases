// galacean example: Collision layers: switching pairs off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collision layers: switching pairs off",
  summary:
    "Red balls on Layer1 and green balls on Layer2 fall in the same column. For a while they bounce off each other, then setColliderLayerCollision(Layer1, Layer2, false) lets them pass through one another while both still land on the Layer0 floor.",
  section: "Physics",
  tags: ['Collider.collisionLayer', 'PhysicsScene.setColliderLayerCollision', 'Layer'],
  docs: [
    'repo/docs/en/physics/collider/collisionLayer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
