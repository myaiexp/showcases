// deck-gl example: CollisionFilterExtension basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CollisionFilterExtension basics',
  summary:
    'A dense ScatterplotLayer with CollisionFilterExtension: points that overlap another on screen are hidden on the GPU, and the survivors change as you zoom. collisionEnabled toggles it.',
  section: 'Extensions',
  tags: ['CollisionFilterExtension', 'collisionEnabled', 'ScatterplotLayer'],
  docs: [
    'repo/docs/api-reference/extensions/collision-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
