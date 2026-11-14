// deck-gl example: Collision groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision groups',
  summary:
    'Layers with the same collisionGroup are tested together, so orange and blue points avoid each other; give the blue layer its own group and each layer only declutters itself.',
  section: 'Extensions',
  tags: ['CollisionFilterExtension', 'collisionGroup'],
  docs: [
    'repo/docs/api-reference/extensions/collision-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
