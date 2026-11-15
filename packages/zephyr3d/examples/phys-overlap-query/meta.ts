// zephyr3d example: overlap and overlapPoint queries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'overlap and overlapPoint queries',
  summary:
    'A probe sweeps over a grid of blocks, and world.overlap (a sphere) or world.overlapPoint (a point) returns the colliders it is inside; the matching blocks light up through collider.node.',
  section: 'Physics',
  tags: ['overlap', 'overlapPoint', 'PhysicsShape', 'Collider'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
