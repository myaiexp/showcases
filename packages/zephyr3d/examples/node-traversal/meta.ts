// zephyr3d example: Finding and walking nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Finding and walking nodes',
  summary:
    'A named node tree you can search and walk: findNodeByName, iterate (top-down), iterateBottomToTop, the isMesh()/isLight() type guards, parent and children. Each walk lights the visited nodes in order.',
  section: 'Basic Framework',
  tags: ['findNodeByName', 'iterate', 'iterateBottomToTop', 'isMesh', 'isLight', 'SceneNode.children', 'SceneNode.parent'],
  docs: ['repo/apps/doc/web/en/scene-graph.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
