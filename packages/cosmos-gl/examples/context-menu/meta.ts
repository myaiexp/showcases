// cosmos-gl example: Context menu
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Context menu',
  summary:
    'A right-click calls onPointContextMenu, onLinkContextMenu or onBackgroundContextMenu depending on what is under the pointer, and each opens a small HTML menu with items for that target. onContextMenu fires as well, for every right-click.',
  section: 'Event callbacks',
  tags: ['onContextMenu', 'onPointContextMenu', 'onLinkContextMenu', 'onBackgroundContextMenu', 'getConnectedPointIndices'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
