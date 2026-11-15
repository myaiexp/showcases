// galacean example: Raycast: picking with the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: picking with the pointer",
  summary:
    "Press on the canvas and the camera's screenPointToRay turns the pixel into a ray; raycast finds the nearest collider, which is tinted and measured. The card replays a pointer that sweeps from box to box.",
  section: "Physics",
  tags: ['Camera.screenPointToRay', 'PhysicsScene.raycast', 'HitResult', 'InputManager.pointers'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
