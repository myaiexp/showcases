// zephyr3d example: Convex hull against mesh collider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Convex hull against mesh collider',
  summary:
    'The same ring twice: a \'mesh\' collider keeps the hole, so a ball falls through it; a \'convex\' collider is the hull of the vertices and fills the hole in.',
  section: 'Physics',
  tags: ['Collider', 'mesh', 'convex', 'TorusShape'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
