// zephyr3d example: Motion types: static, kinematic and dynamic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion types: static, kinematic and dynamic',
  summary:
    'A collider alone is static; a RigidBody makes it dynamic. A lift whose motionType is kinematic follows its node, carrying and shoving the boxes on it. The full view switches the lift between kinematic, dynamic and static.',
  section: 'Physics',
  tags: ['RigidBody', 'motionType', 'kinematic', 'Collider'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
