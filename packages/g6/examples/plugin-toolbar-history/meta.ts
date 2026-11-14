// g6 example: Toolbar: undo and redo with history
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toolbar: undo and redo with history',
  summary: "A toolbar's undo and redo items call the history plugin through getPluginInstance, and edit and delete add or remove a node. The card presses the same actions on a timer.",
  section: 'Plugin',
  tags: ['toolbar', 'history', 'getPluginInstance', 'undo', 'redo'],
  docs: ['repo/packages/site/docs/manual/plugin/Toolbar.en.md', 'repo/packages/site/docs/manual/plugin/History.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
