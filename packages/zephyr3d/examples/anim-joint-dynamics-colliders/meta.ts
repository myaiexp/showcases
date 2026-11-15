// zephyr3d example: Joint Dynamics colliders, flat plane and grabber
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Joint Dynamics colliders, flat plane and grabber',
  summary:
    'A chain of nodes hangs from a bar and is updated by hand with jointDynamics.update(dt). A sphere collider, a flat plane and a grabber are added at runtime and toggled with setColliderEnabled, setFlatPlaneEnabled and setGrabberEnabled.',
  section: 'Animation',
  tags: ['JointDynamicsSystem', 'addSphereCollider', 'addFlatPlane', 'addGrabber', 'setColliderEnabled', 'update', 'resetChains'],
  docs: ['repo/apps/doc/web/en/animation-joint-dynamics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
