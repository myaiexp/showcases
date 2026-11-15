// galacean example: Character controller: stepOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: stepOffset",
  summary:
    "A character walks at five 0.4-high steps. With stepOffset 0.2 it stops at the first riser; with 0.5 it climbs the whole stair. The value alternates every round; the full view has a slider.",
  section: "Physics",
  tags: ['CharacterController.stepOffset', 'CharacterController.move'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
