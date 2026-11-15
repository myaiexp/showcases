// galacean example: Character controller: upDirection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: upDirection",
  summary:
    "Two characters walk a 30-degree incline with slopeLimit 20. The one whose upDirection is world up counts it as a wall; the one whose upDirection is the incline's normal sees flat ground and walks on, because slopes are measured against upDirection.",
  section: "Physics",
  tags: ['CharacterController.upDirection', 'CharacterController.slopeLimit', 'CharacterController.move'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
