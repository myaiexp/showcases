// galacean example: Debug wireframes for colliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Debug wireframes for colliders",
  summary:
    "Colliders registered for wireframes, as the docs' addCollideWireframe does for the auxiliary-lines tool: a box, a ball, a capsule and a ball with a trigger halo are drawn from their shapes' own settings while they fall, and the floor is outlined too. The tool is not installed, so the lines are drawn here.",
  section: "Physics",
  tags: ['Collider.shapes', 'ColliderShape.isTrigger', 'BoxColliderShape', 'CapsuleColliderShape'],
  docs: [
    'repo/docs/en/physics/debug.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
