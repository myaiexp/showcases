// galacean example: Character controller: nonWalkableMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: nonWalkableMode",
  summary:
    "A character is dropped onto a 60-degree slope that is over its slopeLimit. With PreventClimbing it just stands there; with PreventClimbingAndForceSliding it is pushed down the slope. The mode alternates every round.",
  section: "Physics",
  tags: ['CharacterController.nonWalkableMode', 'ControllerNonWalkableMode', 'CharacterController.slopeLimit'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
