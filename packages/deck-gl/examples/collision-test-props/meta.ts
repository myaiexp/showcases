// deck-gl example: Collision test props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision test props',
  summary:
    'collisionTestProps overrides layer props only for the collision test: radiusScale 2 keeps the visible points further apart than they are drawn.',
  section: 'Extensions',
  tags: ['CollisionFilterExtension', 'collisionTestProps'],
  docs: [
    'repo/docs/api-reference/extensions/collision-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
