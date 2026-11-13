// babylon-js example: Instanced physics bodies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instanced physics bodies',
  summary:
    'A single PhysicsBody on a mesh with dozens of thin instances (matrix buffer set non-static): per-instance mass through setMassProperties, one applyImpulse to every instance, and another with an instanceIndex that kicks only the first.',
  section: 'Physics',
  tags: ['thinInstanceSetBuffer', 'PhysicsBody', 'instanceIndex', 'applyImpulse', 'setMassProperties'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/rigidBodies.md', 'repo/content/features/featuresDeepDive/physics/v2/forces.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
