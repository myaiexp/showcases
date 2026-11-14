// playcanvas example: Primitive collision shapes and axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitive collision shapes and axis',
  summary:
    'One body per primitive collision type (box, sphere, capsule, cylinder and cone) falls onto the floor and settles in its own way. The capsule, cylinder and cone take an axis property that aligns the shape with local X, Y or Z; the select changes it live and turns the visible mesh to match.',
  section: 'Physics',
  tags: ['collision', 'halfExtents', 'radius', 'height', 'axis', 'rigidbody'],
  docs: ['repo/docs/user-manual/physics/collision-shapes.md', 'repo/docs/user-manual/editor/scenes/components/collision.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
