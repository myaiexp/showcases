// babylon-js example: Height field physics shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Height field physics shape',
  summary:
    'A ground mesh and a PhysicsShapeHeightField built from one Float32Array of heights: the docs’ index order (row z from the +z edge, column x) lets the same data drive the render mesh and a static body that balls roll over.',
  section: 'Physics',
  tags: ['PhysicsShapeHeightField', 'PhysicsBody', 'PhysicsMotionType.STATIC', 'CreateGround'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/shapes.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
