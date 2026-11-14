// playcanvas example: Continuous collision detection through Ammo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous collision detection through Ammo',
  summary:
    'Fast bullets are fired at two thin walls. The left bullet uses the components alone and tunnels through, because a body moving further than the wall is thick in one step is never overlapping it. The right one reaches into Bullet itself: rigidbody.body is the native btRigidBody, and setCcdMotionThreshold and setCcdSweptSphereRadius turn on continuous collision detection, which stops it at the wall. The speed readout comes from the native getLinearVelocity.',
  section: 'Physics',
  tags: ['rigidbody.body', 'dynamicsWorld', 'setCcdMotionThreshold', 'setCcdSweptSphereRadius', 'getLinearVelocity', 'timeScale'],
  docs: ['repo/docs/user-manual/physics/calling-ammo.md', 'repo/docs/user-manual/physics/physics-basics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
