// zephyr3d example: Compound bodies: child colliders and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound bodies: child colliders and offset',
  summary:
    'A rigid body\'s shape is its own colliders plus those of body-less child nodes (a T built from a stem and a bar), and Collider.offset moves a shape off the node origin (a dumbbell from two offset spheres).',
  section: 'Physics',
  tags: ['Collider', 'offset', 'RigidBody', 'NodePhysics'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js', 'repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
