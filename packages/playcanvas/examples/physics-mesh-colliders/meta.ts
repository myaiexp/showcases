// playcanvas example: Mesh colliders and convex hulls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh colliders and convex hulls',
  summary:
    'A static bowl whose collision is the exact triangle mesh of a procedurally generated render mesh, so balls roll around its concave inside. Dynamic bodies can only use a convex hull: the cones and tori that drop in are built from generated geometry with convexHull set, and the torus visibly behaves as a solid disc because the hull fills in its hole. No collider is ever rescaled.',
  section: 'Physics',
  tags: ['collision', 'mesh', 'render', 'convexHull', 'Mesh', 'TorusGeometry', 'ConeGeometry'],
  docs: ['repo/docs/user-manual/physics/collision-shapes.md', 'repo/docs/user-manual/editor/scenes/components/collision.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
