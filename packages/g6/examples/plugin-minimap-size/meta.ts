// g6 example: Minimap: size, padding and delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimap: size, padding and delay',
  summary: "size sets the thumbnail's width and height, padding insets the graph inside it, and delay (ms) throttles how soon it redraws after the graph changes.",
  section: 'Plugin',
  tags: ['minimap', 'size', 'padding', 'delay', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/Minimap.en.md', 'repo/packages/site/common/api/plugins/minimap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
