// babylon-js example: First physics scene with Havok
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'First physics scene with Havok',
  summary:
    'The physics chapter’s minimal scene: initialize the Havok WebAssembly module, scene.enablePhysics with gravity and a HavokPlugin, then a static ground box and bouncing spheres created as PhysicsAggregates with mass and restitution.',
  section: 'Physics',
  tags: ['HavokPlugin', 'enablePhysics', 'PhysicsAggregate', 'PhysicsShapeType', 'restitution'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/usingPhysicsEngine.md',
    'repo/content/features/featuresDeepDive/physics/v2/usingHavok.md',
    'repo/content/features/featuresDeepDive/physics/v2/aggregates.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
