// g6 example: Minimap: external container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimap: external container',
  summary: "container mounts the thumbnail in an element you supply instead of the graph's own box, so it can sit beside the graph. The full view builds a side panel for it.",
  section: 'Plugin',
  tags: ['minimap', 'container'],
  docs: ['repo/packages/site/docs/manual/plugin/Minimap.en.md', 'repo/packages/site/common/api/plugins/minimap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
