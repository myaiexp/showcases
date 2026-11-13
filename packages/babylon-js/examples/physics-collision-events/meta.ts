// babylon-js example: Collision and trigger events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision and trigger events',
  summary:
    'Balls with setCollisionCallbackEnabled bounce on the floor and flash when plugin.onCollisionObservable reports COLLISION_STARTED, while a shape with isTrigger lights a gate through onTriggerCollisionObservable (TRIGGER_ENTERED and TRIGGER_EXITED). The full view logs every event.',
  section: 'Physics',
  tags: ['onCollisionObservable', 'onTriggerCollisionObservable', 'setCollisionCallbackEnabled', 'isTrigger', 'PhysicsEventType'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/collisionEvents.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
