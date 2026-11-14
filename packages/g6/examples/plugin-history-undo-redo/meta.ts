// g6 example: History: undo and redo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'History: undo and redo',
  summary: 'The history plugin records each draw as a command. Buttons add, recolour and remove nodes, then step back and forward with undo() and redo() from getPluginInstance; clear() empties both stacks.',
  section: 'Plugin',
  tags: ['history', 'undo', 'redo', 'clear', 'canUndo', 'canRedo'],
  docs: ['repo/packages/site/docs/manual/plugin/History.en.md', 'repo/packages/site/common/api/plugins/history.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
