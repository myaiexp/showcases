// playcanvas example: Trigger volumes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trigger volumes',
  summary:
    'A collision component with no rigidbody is a trigger: a translucent gate slides back and forth under setPosition while balls fall through it without being blocked. The gate fires triggerenter and triggerleave with the ball entity, and each ball\'s own rigidbody gets the same events with the trigger entity, which it checks for a tag. A static pillar inside the gate never fires, because only dynamic and kinematic bodies do.',
  section: 'Physics',
  tags: ['triggerenter', 'triggerleave', 'collision', 'Tags', 'setPosition', 'halfExtents'],
  docs: ['repo/docs/user-manual/physics/trigger-volumes.md', 'repo/docs/user-manual/physics/collision-shapes.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
