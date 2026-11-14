// deck-gl example: Collision label decluttering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision label decluttering',
  summary:
    'A TextLayer of city labels with CollisionFilterExtension and getCollisionPriority = population: zoom out and small cities lose their label to bigger neighbours.',
  section: 'Extensions',
  tags: ['CollisionFilterExtension', 'TextLayer', 'getCollisionPriority', 'collisionEnabled'],
  docs: [
    'repo/docs/api-reference/extensions/collision-filter-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
