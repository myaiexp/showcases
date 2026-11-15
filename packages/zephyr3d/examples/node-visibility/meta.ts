// zephyr3d example: Visibility: showState and the resolved hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Visibility: showState and the resolved hidden',
  summary:
    'A parent with two child spheres. showState is visible, hidden or inherit (the default); the read-only `hidden` is what the walk up the ancestors resolves to, so read that to know whether a node shows.',
  section: 'Basic Framework',
  tags: ['SceneNode.showState', 'SceneNode.hidden', 'SceneNodeVisible'],
  docs: ['repo/apps/doc/web/en/scene-graph.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
