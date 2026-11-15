// galacean example: Raycast: layerMask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: layerMask",
  summary:
    "A ray crosses three walls on Layer1, Layer2 and Layer3. The layerMask argument picks which layers it can hit: the mask cycles through Everything, Layer1, Layer2, Layer1 | Layer2 and Layer3, and the ray passes through the walls the mask leaves out.",
  section: "Physics",
  tags: ['PhysicsScene.raycast', 'Collider.collisionLayer', 'Layer', 'HitResult.entity'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
