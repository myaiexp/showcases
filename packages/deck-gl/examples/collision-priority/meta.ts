// deck-gl example: Collision priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision priority',
  summary:
    'getCollisionPriority ranks objects in -1000..1000 so the higher value is the one kept when two overlap. Switch between value-wins, value-loses and no priority.',
  section: 'Extensions',
  tags: ['CollisionFilterExtension', 'getCollisionPriority'],
  docs: [
    'repo/docs/api-reference/extensions/collision-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
