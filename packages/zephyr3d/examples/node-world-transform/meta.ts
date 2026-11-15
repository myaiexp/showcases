// zephyr3d example: World transform and bounding volumes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World transform and bounding volumes',
  summary:
    'A sphere parented to a spinning pivot. Its local `position` stays put while getWorldPosition(), worldMatrix and getWorldBoundingVolume() follow the parent; a translucent box is drawn at the world bounds.',
  section: 'Basic Framework',
  tags: ['getWorldPosition', 'worldMatrix', 'getWorldBoundingVolume', 'getBoundingVolume'],
  docs: ['repo/apps/doc/web/en/scene-graph.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
