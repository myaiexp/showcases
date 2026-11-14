// g6 example: Contextmenu: enable for edges only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Contextmenu: enable for edges only',
  summary: "enable receives the event, so returning targetType === 'edge' limits the menu to edges and leaves nodes without one.",
  section: 'Plugin',
  tags: ['contextmenu', 'enable', 'targetType', 'getItems'],
  docs: ['repo/packages/site/docs/manual/plugin/Contextmenu.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
