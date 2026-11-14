// g6 example: Contextmenu: items and onClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Contextmenu: items and onClick',
  summary: 'The contextmenu plugin lists getItems entries on a right-click and reports the chosen value to onClick with the element it was opened on. Delete removes that node.',
  section: 'Plugin',
  tags: ['contextmenu', 'getItems', 'onClick', 'removeNodeData'],
  docs: ['repo/packages/site/docs/manual/plugin/Contextmenu.en.md', 'repo/packages/site/common/api/plugins/contextmenu.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
