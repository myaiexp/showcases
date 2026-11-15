// galacean example: Collision events: flash on impact
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collision events: flash on impact",
  summary:
    "Balls light up white on onCollisionEnter and fade back to colour, and the one that hits the floor the hardest flashes brightest: the script reads the shape that was hit from the Collision it is given.",
  section: "Physics",
  tags: ['onCollisionEnter', 'Collision.shape', 'Collider.entity'],
  docs: [
    'repo/docs/en/physics/collider/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
