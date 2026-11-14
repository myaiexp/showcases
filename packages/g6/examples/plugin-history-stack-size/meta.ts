// g6 example: History: stackSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'History: stackSize',
  summary: 'stackSize caps how many commands the history keeps. Ten recolours are recorded, then undo all counts how many steps come back.',
  section: 'Plugin',
  tags: ['history', 'stackSize', 'undo', 'canUndo', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/History.en.md', 'repo/packages/site/common/api/plugins/history.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
