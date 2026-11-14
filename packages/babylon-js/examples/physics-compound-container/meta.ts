// babylon-js example: Compound shape with PhysicsShapeContainer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound shape with PhysicsShapeContainer',
  summary:
    'A robot made of a box torso and a sphere head, physicalised with PhysicsShapeContainer.addChildFromParent (green), dropped next to the same robot on a single tall box shape (red) to show how the simpler approximation misses the round head.',
  section: 'Physics',
  tags: ['PhysicsShapeContainer', 'addChildFromParent', 'PhysicsShapeBox', 'PhysicsShapeSphere', 'compound'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/compounds.md',
    'repo/content/features/featuresDeepDive/physics/v2/shapes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
