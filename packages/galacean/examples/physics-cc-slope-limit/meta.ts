// galacean example: Character controller: slopeLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: slopeLimit",
  summary:
    "A character walks up a 40-degree ramp. With slopeLimit 35 the ramp counts as a wall and it stops at the foot; with 55 it climbs. The limit alternates each round; the full view has a slider.",
  section: "Physics",
  tags: ['CharacterController.slopeLimit', 'CharacterController.move'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
